import fetch from 'isomorphic-fetch'
import wdk from 'wikidata-sdk'

export default async function semantics (req, res) {
  // 1. Get all the liqens
  const liqens = await req.core.liqens.index()

  // 2. Get the annotations of each liqen
  const expandedLiqens = await Promise.all(
    liqens.map(async liqen => {
      const fullLiqen = await req.core.liqens.show(liqen.id)
      const annotations = await Promise.all(
        fullLiqen.annotations.map(({id}) =>
          req.core.annotations.show(id)
        )
      )

      return Object.assign({}, fullLiqen, {annotations})
    })
  )

  // 3. Look for annotations that are "places" (have tags 1 or 3)
  //    Set a new property in them
  const result = await Promise.all(
    expandedLiqens
      .map(async ({id, annotations}) => ({
        id,
        annotations: await Promise.all(annotations
          .map(markAsPlace)
          .map(searchPlace)
          .map(promise => promise.then(getWikidata)))
      })))

  res.send(result)
}

function markAsPlace ({id, author, article_id, target, tags}) {
  const validTags = [1, 3]
  let semantics = {}

  if (tags.filter(tag => validTags.indexOf(tag.id) !== -1).length > 0) {
    semantics = {
      type: 'place'
    }
  }
  return {
    id,
    author,
    article_id,
    target,
    tags,
    semantics
  }
}

async function searchPlace (annotation) {
  if (!annotation.semantics) {
    return annotation
  }

  const {semantics: semanticsBefore} = annotation
  if (!semanticsBefore.type || semanticsBefore.type !== 'place') {
    return annotation
  }

  // Query to wikidata
  const query = `https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=${annotation.target.exact}&normalize=&props=&format=json`
  const object = await fetch(query)
    .then(response => response.json())

  const wikidataEntity = Object.keys(object.entities)[0]
  const semantics = Object.assign({}, semanticsBefore, {wikidataEntity})

  return Object.assign({}, annotation, {semantics})
}

async function getWikidata (annotation) {
  console.log(annotation.semantics)
  if (!annotation.semantics || !annotation.semantics.wikidataEntity) {
    return annotation
  }

  // Create the query
  const wikidataEntity = annotation.semantics.wikidataEntity
  const query = `
    SELECT ?gdp_capita ?hdi ?unemployment ?member_of ?member_ofLabel {
      wd:${wikidataEntity} wdt:P17 ?country.

      ?country wdt:P2132 ?gdp_capita.
      ?country wdt:P1198 ?unemployment.
      ?country wdt:P1081 ?hdi.
      ?country wdt:P463 ?member_of

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en,ga". }
  }
  `
  const url = wdk
    .sparqlQuery(query)

  const s2 = await fetch(url)
    .then(response => response.json())
    .then(wdk.simplifySparqlResults)
    .then(results => {
      const gdpCapita = results[0].gdp_capita
      const unemployment = results[0].unemployment
      const hdi = results[0].hdi
      const memberOf = results.map(r => r.member_of.value)

      return {
        gdpCapita,
        unemployment,
        hdi,
        memberOf
      }
    })

  const semantics = Object.assign({}, annotation.semantics, s2)

  return Object.assign({}, annotation, {semantics})
}

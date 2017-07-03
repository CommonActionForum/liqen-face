import React from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

import Article from '../components/annotators/article-annotator'
import MultiList from '../components/lists/multi-list'
import LiqenCreator from '../components/liqen-creator/liqen-creator'
import CallToAction from '../components/liqen-creator/call-to-action'
import { createAnnotation,
         createLiqen,
         addAnnotationToLiqen,
         removeAnnotationToLiqen } from '../actions/index'

const article = window.__ARTICLE__

export class Annotate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      articleBody: {
        name: 'div',
        attrs: {},
        children: []
      }
    }
  }

  componentDidMount () {
    fetch(`/parseArticle?uri=${article.source.uri}`)
      .then(response => response.json())
      .then(obj => {
        this.setState({articleBody: obj.body.object})
      })
  }

  render () {
    const {
      question,
      answer,
      annotations,
      liqens,
      tags,
      onCreateAnnotation,
      onCreateLiqen,
      onAddAnnotationToLiqen,
      onRemoveAnnotationToLiqen
    } = this.props

    return (
      <div>
        <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
          <a className='navbar-brand' href='/'>
            <img
              src='/static/logo-inverse-h40.png'
              width='56'
              height='20'
              className='d-inline-block align-top my-1'
            />
          </a>
          <div className='navbar-nav mr-auto' />
          <CallToAction
            answer={answer}
          />
        </nav>
        <div className='container mt-4'>
          <div className='row'>
            <aside className='hidden-md-down col-lg-4 flex-last'>
              <MultiList
                annotations={annotations}
                liqens={liqens}
              />
            </aside>
            <div className='col-lg-8 col-xl-7'>
              <header>
                <h1 className="article-title">{article.title}</h1>
              </header>
              <main className='article-body'>
                <Article
                  body={this.state.articleBody}
                  tags={tags}
                  onCreateAnnotation={onCreateAnnotation}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToAnswer = (state) => {
  const annotationsArray = []

  for (let ref in state.annotations) {
    annotationsArray.push({
      ref,
      target: state.annotations[ref].target,
      tag: state.annotations[ref].tag,
      active: state.newLiqen.answer.indexOf(ref) !== -1
    })
  }

  return state.question.answer.map(
    ({tag, required}) => ({
      tag: state.tags[tag].title,
      annotations: annotationsArray
        .filter(
          annotation => annotation.tag === tag
        )
        .map(
          ({target, active, ref}) => ({
            fragment: target.exact,
            ref,
            active
          })
        ),
      required
    })
  )
}

const mapStateToAnnotations = (state) => {
  const ret = []

  for (let ref in state.annotations) {
    const {tag, checked, pending, target} = state.annotations[ref]

    ret.push({
      tag: state.tags[tag].title,
      ref,
      target,
      checked,
      pending
    })
  }

  return ret
}

const mapStateToLiqens = (state) => {
  const ret = []

  for (let ref in state.liqens) {
    const {answer, pending} = state.liqens[ref]

    ret.push({
      answer: answer
        .map(a => {
          if (!state.annotations[a]) {
            return null
          }

          const {tag, target} = state.annotations[a]

          return {
            target,
            ref: a,
            tag: state.tags[tag]
          }
        })
        .filter(a => a !== null),
      ref,
      pending
    })
  }

  return ret
}

const mapStateToProps = (state) => ({
  question: state.question.title,
  answer: mapStateToAnswer(state),
  annotations: mapStateToAnnotations(state),
  liqens: mapStateToLiqens(state),
  tags: state.question.answer.map(
    ({tag}) => ({ref: tag, title: state.tags[tag].title})
  ),
  enableCreateLiqen: state.newLiqen.answer.every(
    a => state.annotations[a] && !state.annotations[a].pending
  )
})
const mapDispatchToProps = (dispatch) => ({
  onCreateAnnotation: ({target, tag}) => dispatch(createAnnotation(target, tag)),
  onCreateLiqen: () => dispatch(createLiqen()),
  onAddAnnotationToLiqen: (ref) => dispatch(addAnnotationToLiqen(ref)),
  onRemoveAnnotationToLiqen: (ref) => dispatch(removeAnnotationToLiqen(ref))
})
const mergeProps = (stateProps, dispatchProps) =>
  Object.assign({}, stateProps, dispatchProps, {
    onCreateLiqen: (stateProps.enableCreateLiqen && dispatchProps.onCreateLiqen) || undefined
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Annotate)

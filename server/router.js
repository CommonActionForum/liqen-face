/**
 * Router for "non-dashboard" pages
 */
import express from 'express'
import bodyParser from 'body-parser'
import checkSession from './middlewares/check-session'
import login from './middlewares/login'

import index from './endpoints/index'
import parseArticle from './endpoints/parseArticle'
import annotate from './endpoints/annotate'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', checkSession, index)
router.get('/parseArticle', parseArticle)
router.get('/annotate', checkSession, annotate)

router.get('/about', (req, res) => {
  res.render('about')
})

router.post('/login', urlencodedParser, login, (req, res) => {
  res.redirect('/')
})

router.get('/login', (req, res) => {
  res.render('index')
})

router.get('/--dev/login/medium', (req, res) => {
  // Request a state to the core
  const state = 'blablabla'

  const redirectUri =
    encodeURIComponent(`${process.env.MEDIUM_REDIRECT_URI}/--dev/callback/medium`)

  // Redirect the user
  const uri = `https://medium.com/m/oauth/authorize?`
    + `client_id=${process.env.MEDIUM_CLIENT_ID}`
    + `&scope=basicProfile`
    + `&state=${state}`
    + `&response_type=code`
    + `&redirect_uri=${redirectUri}`

  res.redirect(uri)
})

router.get('/--dev/callback/medium', (req, res) => {
  // Get state and code
  // Request to the core
  // Get the token
  // Redirect to /import-content/medium
  res.redirect('/--dev/import-content/medium')
})

router.get('/--dev/import-content/medium', (req, res) => {
  res.render('import-medium')
})

router.get('*', (req, res) => {
  res.send('404 Not found')
})

export default router

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
import semantics from './endpoints/semantics'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', checkSession, index)
router.get('/parseArticle', parseArticle)
router.get('/annotate', checkSession, annotate)
router.get('/search-raw', semantics)

router.get('/about', (req, res) => {
  res.render('about')
})

router.get('/search', (req, res) => {
  res.render('search')
})

router.post('/login', urlencodedParser, login, (req, res) => {
  res.redirect('/')
})

router.get('/login', (req, res) => {
  res.render('index')
})

router.get('*', (req, res) => {
  res.send('404 Not found')
})

export default router

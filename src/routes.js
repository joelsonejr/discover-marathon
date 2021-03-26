const express = require('express')
const routes = express.Router()


const views = __dirname + '/views/'

const profile = {
    name: 'Joe',
    avatar: 'https://avatars.githubusercontent.com/u/53396470?v=4',
    'monthly-budget': 1537,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4

}

//req, res
routes.get('/', (req, res) => res.render(views + 'index'))
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job-edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', {profile})) 


/* 
Essas rotas foram descartadas. As novas vão rnederizar a página, passando pelo 'ejs'

routes.get('/', (req, res) => res.sendFile(basePath + 'index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + 'job.html'))
routes.get('/job-edit', (req, res) => res.sendFile(basePath + 'job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + 'profile.html')) */

module.exports = routes;
const express = require('express')
const routes = express.Router()
const ProfileControler = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

//req, res
routes.get('/', JobController.index )
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileControler.index) 
routes.post('/profile', ProfileControler.update) 

module.exports = routes;

/* 
Essas rotas foram descartadas. As novas vão rnederizar a página, passando pelo 'ejs'

routes.get('/', (req, res) => res.sendFile(basePath + 'index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + 'job.html'))
routes.get('/job-edit', (req, res) => res.sendFile(basePath + 'job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + 'profile.html')) */
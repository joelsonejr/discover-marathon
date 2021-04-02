const express = require('express')
const routes = express.Router()


const views = __dirname + '/views/'

const Profile = {
    data: {
        name: 'Joe',
        avatar: 'https://github.com/joelsonejr.png',
        'monthly-budget': 1537,
        'days-per-week': 5,
        'hours-per-day': 5,
        'vacation-per-year': 4,
        'value-hour' : 75
    },
    
    controllers: {
        index (req, res){
            return res.render(views + 'profile', {profile: Profile.data})
        },

        update(req, res){
            // req.body para pegar os dados de
            const data = req.body

            // definir quantas semanas tem num ano
            const weeksPerYear = 52

            // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
            const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) /12

            // total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            //horas trabalhadas no mês
            const mothlyTotalHours = weekTotalHours * weeksPerMonth

            //qual será o valor da minha hora?
            const valueHour = data['monthly-budget'] / mothlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                'value-hour': valueHour
            }

            return res.redirect('/profile')
        }
    },

    
}


const Job = {
    data: [
        {
            id: 1,
            name: 'Pizzaria Guloso', 
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            
        },
        {
            id: 2,
            name: 'OneTwo Project', 
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
            
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                    //ajustes no job
                const remaining = Job.services.remainingDays(job)
                
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining: remaining, 
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
                }
            })
                
            return res.render(views + 'index', {jobs : updatedJobs})

        },

        create(req, res){
            return res.render(views + 'job')
        },

        save(req, res) {
            //req.body = { name: 'asdf', 'daily-hours': '0.5', 'total-hours': '4' }
            const lastId = Job.data[Job.data.length - 1]?.id || 0; 
            /* como em JS acessar um objeto que não existe resulta em erro, foi utilizada a '?' para contornar esse problema. O que ela diz é: caso o elemento 'jobs[jobs.length -1] exista, continue (no caso, pegue o id dele). Caso não exista, não faça nada. 
            Em seguida, o '||' só será execuado caso o que está antes dele não ocorra.  */
            
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo a data de hoje
            })
            return res.redirect('/')
        },

        show(req, res) {

            //'params' são os parâmetros da requisição (as informaçoes que foram enviadas anexadas ao endereço html)
            const jobId = req.params.id 

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send('Job not found')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

            return res.render(views + 'job-edit', { job })
        },

        update(req, res){
            const jobId = req.params.id 

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send('Job not found')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                'total-hours': req.body['total-hours'],
                'daily-hours': req.body['daily-hours']
            }

            Job.data = Job.data.map(job => {

                if (Number(job.id) === Number(jobId)){
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' +jobId)
        },

        delete(req, res){
            const jobId = req.params.id 

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: { 
         remainingDays(job){
            //calculo de tempo restante 
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            const createdDate = new Date(job.created_at) 
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            
            //transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            //restam x dias
            return dayDiff
        },

        calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }
}


//req, res
routes.get('/', Job.controllers.index )
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index) 
routes.post('/profile', Profile.controllers.update) 


/* 
Essas rotas foram descartadas. As novas vão rnederizar a página, passando pelo 'ejs'

routes.get('/', (req, res) => res.sendFile(basePath + 'index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + 'job.html'))
routes.get('/job-edit', (req, res) => res.sendFile(basePath + 'job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + 'profile.html')) */

module.exports = routes;
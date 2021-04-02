const express = require('express')
const routes = express.Router()


const views = __dirname + '/views/'

const profile = {
    name: 'Joe',
    avatar: 'https://github.com/joelsonejr.png',
    'monthly-budget': 1537,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour' : 75

}

const jobs = [
    {
        id: 1,
        name: 'Pizzaria Guloso', 
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now()
    },
    {
        id: 2,
        name: 'OneTwo Project', 
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
]

function remainingDays(job){
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
}

//req, res
routes.get('/', (req, res) => {
    

    const updatedJobs = jobs.map((job) => {
            //ajustes no job
        const remaining = remainingDays(job)
        
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
            ...job,
            remaining: remaining, 
            status,
            budget: profile['value-hour'] * job['total-hours']
        }
    })
        
        return res.render(views + 'index', {jobs : updatedJobs})

})

routes.get('/job', (req, res) => res.render(views + 'job'))
routes.post('/job', (req, res) => {
    //req.body = { name: 'asdf', 'daily-hours': '0.5', 'total-hours': '4' }

    const lastId = jobs[jobs.length - 1]?.id || 1; //como em JS acessar um objeto que não existe resulta em erro, foi utilizada a '?' para contornar esse problema. O que ela diz é: caso o elemento 'jobs[jobs.length -1] exista, continue (no caso, pegue o id dele). Caso não exista, não faça nada. 
    //Em seguida, o '||' só será execuado caso o que está antes dele não ocorra. 
    
    const job = req.body
    job.created_at = Date.now() //atribuindo uma nova data
    
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo a data de hoje
    })
    return res.redirect('/')
})
routes.get('/job-edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', {profile})) 


/* 
Essas rotas foram descartadas. As novas vão rnederizar a página, passando pelo 'ejs'

routes.get('/', (req, res) => res.sendFile(basePath + 'index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + 'job.html'))
routes.get('/job-edit', (req, res) => res.sendFile(basePath + 'job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + 'profile.html')) */

module.exports = routes;
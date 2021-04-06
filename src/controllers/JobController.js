const Job = require('../model/Job') // Letra maiúscula quando se trata de uma importação
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res){
        return res.render('job')
    },

    save(req, res) {

        const jobs = Job.get()

        //req.body = { name: 'asdf', 'daily-hours': '0.5', 'total-hours': '4' }
        const lastId = jobs[jobs.length - 1]?.id || 0; 
        /* como em JS acessar um objeto que não existe resulta em erro, foi utilizada a '?' para contornar esse problema. O que ela diz é: caso o elemento 'jobs[jobs.length -1] exista, continue (no caso, pegue o id dele). Caso não exista, não faça nada. 
        Em seguida, o '||' só será execuado caso o que está antes dele não ocorra.  */
        
        jobs.push({
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
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send('Job not found')
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render('job-edit', { job })
    },

    update(req, res){
        const jobId = req.params.id 
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send('Job not found')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours']
        }

        const newJobs = jobs.map(job => {

            if (Number(job.id) === Number(jobId)){
                job = updatedJob
            }

            return job
        })

        Job.update(newJobs)

        res.redirect('/job/' +jobId)
    },

    delete(req, res){
        const jobId = req.params.id 

        Job.delete(jobId)

        return res.redirect('/')
    }
}
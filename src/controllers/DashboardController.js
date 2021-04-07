const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    const jobs = Job.get(); //O '.get()' está pegando todos os dados do Job (conferir as importaçõe acima)
    const profile = Profile.get();
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas/dia de cada job em progressos
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // Somando a quantidade de status
      statusCount[status] += 1 // O operador ternário atribui 'done' ou 'progress' à variável 'status' O conteúdo da variável status está sendo utilizado como referência, para acessar a propriedade de mesmo nome ('done' ou 'progress') do objeto statusCount.

      // total de horas/dia de cada job em progressos
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        remaining: remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    //qtd de horas que quero trabalhar 
    // MENOS 
    // quantidade de horas/ dia de cada job em andamento.
    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};

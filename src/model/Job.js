const Database = require('../db/config')


module.exports = {
   async get(){
        const db = await Database()


        const jobs = await db.all(`SELECT *  FROM jobs`)


        await db.close()

        // como a arrow function só está fazendo um 'return', ao invés de colocar a palavra 'return' antes do que quero retornar, basta envolver o elemento em questão por '()'
        // quando a arrow function possui a estrutura abaixo (um objeto dentro de parênteses), ela entende que os '()' não estão fazendo referência a uma função, mas sim a algo a ser retornado.
        return jobs.map(job => ({ 
            id: job.id, 
            name: job.name,
            "daily_hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }))

        
    },

    update(newJob){
        data = newJob
    },

    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id))
    },
    async create(newJob){

      const db = await Database()

      await db.run(`INSERT INTO jobs (
          name, 
          daily_hours,
          total_hours,
          created_at
      ) VALUES (
          "${newJob.name},"
          ${newJob.daily_hours},
          ${newJob.total_hours},
          ${newJob.created_at}
      )`)

      await db.close()
      data.push(newJob)
    }
}

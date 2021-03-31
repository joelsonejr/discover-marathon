const express = require("express") //método do node que me permite carregar pacotes da node modules.
const server = express()
const routes = require('./routes')

//utilizando o template engine
server.set('view engine', 'ejs') 

//utilizando o express para criar a rota para os arquivos na pasta public
//hablitar os arquivos estáticos
// #middleman
// 'use()': serve para adicionar configurações ao servidor
server.use(express.static("public"))

//usar o req.body - disponibiliza a requisição que vem com a codificação de um formulário do tipo post
server.use(express.urlencoded({extended: true}))

//routes 
server.use(routes)


//'listen' liga o servidor. recebe como argumento a porta desejada, e o que deve ser feito.
server.listen(3000, () => {console.log('running')} ) 



/* 
    Foi movido para o 'routes.js'    

//request, response
server.get('/', (request, response) => {

    // return response.send('oi') // envia uma mensagem

    // '__dirname' aponta para o caminho absoluto do servidor.
    return response.sendFile(__dirname + '/views/index.html')
}) */
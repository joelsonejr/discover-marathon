const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // a utilização de {} indica para o JS que desejo ir dentro do sqlite, pegar a funcionalidade chamada 'open', e importar apenas ela.

// o 'open' serve para abrir a conexão com o banco de dados. 
// Ele está no pacote do 'sqlite'
//Ele deve ser encapsulado por '{}', e deve estar dentro da estrutura de uma função.

// é o arquivo no qual o BD armazenará os dados
// responsável por manipular os dados
// faz a abertura da conexão com o DB
module.exports = () => open({
    filename: "./database.sqlite", 
    driver: sqlite3.Database
  });


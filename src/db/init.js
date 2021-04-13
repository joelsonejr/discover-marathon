const Database = require("config");

Databse(); //inicia a conexão como banco de dados

// o código foi passado entre crases para que se pudesse utilizar a quebra de linha
// criando a tabela 'profile'
// os textos em maiúsculo são comandos SQL
// o banco de dados não aceita '-'. Por isso eles foram substituidos por underline

Database.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT

)`);

//'DATETIME' informação do tipo hora-data
Database.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    daily_hours INT, 
    total_hours INT, 
    created_at DATETIME 

)`);

//Inserindo itens no banco de dados
Database.run(`INSERT INTO profile (
    name, 
    avatar, 
    monthly_budget,
     days_per_week, 
     hours_per_day, 
     vacation_per_year, 
     value_hour
) VALUES (
    "joelson", 
    "https://github.com/joelsonejr.png",
    3000,
    5,
    5,
    4,
);`);

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "Pizazaria Guloso",
    2,
    1,
    1618280762621, 

);`);

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "OneTwo Project",
    3,
    47,
    1618280762621, 

);`);

Database.close(); //encerra a conexão com o banco de dados




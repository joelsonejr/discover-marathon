const Database = require('config')

Databse() //inicia a conexão como banco de dados

Database.exec();


Database.close() //encerra a conexão com o banco de dados


CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT
    monthly-budget INT,
    days-per-week INT,
    hours-per-day INT,
    vacation-per-year INT,
    value-hour INT

)
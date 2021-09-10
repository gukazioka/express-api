import sqlite3 from 'sqlite3'

sqlite3.verbose()

const dbpath = './database/data/data.db'

let db = new sqlite3.Database(dbpath, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    }   
    else {
        console.log('Connected to the SQLite database.')
        const tabelas = [
            `CREATE TABLE IF NOT EXISTS CAIXA(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cpf varchar(20),
                nome varchar(50),
                password varchar(50),
                saldo decimal(10, 2)
            );`
        ]

        tabelas.forEach(tabela => {
            db.run(tabela, function (err) {
                if (err) {
                    console.log('Tabela já existe');
                    if (!err.message.includes("already exists")) {
                        console.log(err);
                    }
                } else {
                    console.log(err);
                }
            });
        });
    }
});

export default db

/* import connection from "./config.js"

export default class DatabaseInit {
    static async createTables() {
        return new Promise((resolve, reject) => {
            const query = `
            CREATE TABLE IF NOT EXISTS CAIXA(
                id int not null auto_increment,
                nome varchar(50),
                password varchar(50),
                saldo decimal(10, 2),
                primary key(id)
            )`
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                else {
                    console.log('Tabela criada')
                    resolve(results)
                }
            })
        })
    }

} */
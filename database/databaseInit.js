
import connection from "./config.js"

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
    
}
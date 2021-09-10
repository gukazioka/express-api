import db from "../database/config.js"

export default class Caixa{
    static addCliente(usuario){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO CAIXA(nome, password, saldo, cpf) values (?,?,?,?);'
            const params = [
                usuario.nome,
                usuario.password,
                usuario.saldo,
                usuario.cpf
            ]
            db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                }
                let response = (`ID Adicionado: ${this.lastID}`);
                console.log(response)
                resolve(response);
            });
        })
    }

    static removeCliente(usuarioID){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM CAIXA WHERE id = ?`
            db.run(sql, usuarioID, (err) => {
                if(err)
                    reject(err)
                else
                    resolve({"message": `Usuário do id ${usuarioID} deletado.`})
            })
        })
    }

    static getCliente(){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, nome, password, cpf, saldo FROM caixa;'
            db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err)
                }
                resolve(rows);
            });
        });
    }

    static getClientePorID(usuarioID){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM CAIXA WHERE id = ?'
            db.all(sql, usuarioID, (err, rows) => {
                if(err){
                    reject(err)
                }
                resolve(rows);
            });
        });
    }

    static getClientePorCPF(usuarioCPF){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM CAIXA WHERE cpf = ?'
            db.all(sql, usuarioCPF, (err, rows) => {
                if(err){
                    reject(err)
                }
                resolve(rows);
            });
        });
    }

    static depositarDinheiro(valorDepositado, usuarioID){
        return new Promise((resolve, reject) => {
            const sql = `UPDATE CAIXA SET saldo = (saldo + ?) where id = ?`
            db.run(sql, [valorDepositado, usuarioID], (err) => {
                if(err)
                    reject(err)
                else
                    resolve({"message": `Depositado R$${valorDepositado} para o id ${usuarioID} .`})
            })
        })
    }

    static sacarDinheiro(valorSacado, usuarioID){
        return new Promise((resolve, reject) => {
            const sql = `UPDATE CAIXA SET saldo = (saldo - ?) where id = ?`
            db.run(sql, [valorSacado, usuarioID], (err) => {
                if(err)
                    reject(err)
                else{
                    resolve({"message": `Sacado R$${valorSacado} do id ${usuarioID} .`})
                }
            })
        })
    }
}
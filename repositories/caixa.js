import query from "../database/query.js"

export default class Caixa{
    static addCliente(usuario){
        const sql = 'INSERT INTO CAIXA SET ?'
        return query(sql, usuario)
    }

    static removeCliente(usuarioID){
        const sql = `DELETE FROM CAIXA WHERE id = ?`
        return query(sql, usuarioID)
    }

    static getCliente(){
        const sql = 'SELECT * FROM CAIXA'
        return query(sql)
    }

    static getClientePorID(usuarioID){
        const sql = 'SELECT * FROM CAIXA WHERE id = ?'
        return query(sql, usuarioID)
    }

    static depositarDinheiro(valorDepositado, usuarioID){
        const sql = `UPDATE CAIXA SET saldo = (saldo + ?) where id = ?`
        return query(sql, [valorDepositado, usuarioID])
    }

    static sacarDinheiro(valorSacado, usuarioID){
        const sql = `UPDATE CAIXA SET saldo = (saldo - ?) where id = ?`
        return query(sql, [valorSacado, usuarioID])
    }
}
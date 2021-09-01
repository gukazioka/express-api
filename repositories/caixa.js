import query from "../database/query.js"

export default class Caixa{
    
    addUsuario(usuario){
        const sql = 'INSERT INTO CAIXA SET ?'
        return query(sql, usuario)
    }

    removeUsuario(usuarioID){
        const sql = `DELETE FROM CAIXA WHERE id = ?`
        return query(sql, usuarioID)
    }

    getUsuario(){
        const sql = 'SELECT * FROM CAIXA'
        return query(sql)
    }

    getUsuarioPorID(usuarioID){
        const sql = 'SELECT * FROM CAIXA WHERE id = ?'
        return query(sql, usuarioID)
    }

    depositarDinheiro(valorDepositado, usuarioID){
        const sql = `UPDATE CAIXA SET saldo = (saldo + ?) where id = ?`
        return query(sql, [valorDepositado, usuarioID])
    }

    sacarDinheiro(valorSacado, usuarioID){
        const sql = `UPDATE CAIXA SET saldo = (saldo - ?) where id = ?`
        return query(sql, [valorSacado, usuarioID])
    }
}
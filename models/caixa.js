import caixaQuery from '../repositories/caixa.js'

export default class CaixaModel {

    static buscaClientes() {
        return caixaQuery.getCliente()
    }

    static buscaClientePorId(id) {
        return caixaQuery.getClientePorID(id)
    }

    static adicionarCliente(cliente) {
        if (cliente.saldo < 0.0) {
            return new Promise((resolve, reject) => reject('Cliente não pode ter saldo negativo'))
        }
        return caixaQuery.addCliente(cliente)
            .then(results => {
                const id = results.insertId
                console.log(id)
                return ({ id, ...cliente })
            })
    }

    static async saqueDinheiro(id, valor) {
        const conta = await caixaQuery.getClientePorID(id);
        let saldo = parseFloat(conta[0].saldo)
        valor = parseFloat(valor)
        if (valor > saldo) {
            return new Promise((resolve, reject) => {
                reject('Transação não autorizada')
            })
        }

        return caixaQuery.sacarDinheiro(valor, id)
            .then(results => {
                if (results != null) {
                    return ({ results })
                }
                else {
                    const response = [{"message": "Conta inexistente ou saldo insuficiente."}]
                    return ({ response })
                }
            })
    }

    static depositDinheiro(id, valor) {
        if (valor <= 0) {
            return new Promise((resolve, reject) => {
                reject('Valor para depósito inválido')
            })
        }
        return caixaQuery.depositarDinheiro(valor, id)
            .then(results => {
                if (results != null) {
                    return ({ results })
                }
                else {
                    const response = `Conta não existe, valor não depositado`
                    return ({ response })
                }
            })
    }

    static deleteCliente(id){
        return caixaQuery.removeCliente(id)
    }
}
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
                return ({ id, ...cliente })
            })
    }

    static async saqueDinheiro(cliente) {
        const conta = await caixaQuery.getClientePorID(cliente.id);
        let saldo = parseFloat(conta[0].saldo)
        if (cliente.valor > saldo) {
            return new Promise((resolve, reject) => {
                reject('Transação não autorizada')
            })
        }
        return caixaQuery.sacarDinheiro(cliente.valor, cliente.id)
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

    static depositDinheiro(cliente) {
        if (cliente.valor <= 0) {
            return new Promise((resolve, reject) => {
                reject('Valor para depósito inválido')
            })
        }
        return caixaQuery.depositarDinheiro(cliente.valor, cliente.id)
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

    static async logarCliente(cliente){
        console.log(cliente)
        const conta = await caixaQuery.getClientePorCPF(cliente.cpf)
        if(conta[0].password == cliente.password){
            return new Promise((resolve, reject) => {
                const response = [{"message": "Usuário logado com sucesso."}]
                resolve(response)
            })
        }
        else{
            return new Promise((resolve, reject) => {
                const response = [{"message": "CPF ou senha incorreta"}]
                reject(response)
            })
        }
    }

    static deleteCliente(id){
        return caixaQuery.removeCliente(id)
    }
}
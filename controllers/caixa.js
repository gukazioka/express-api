import express from "express"
import CaixaModel from "../models/caixa.js"

const rotas = express.Router()

rotas.get('/caixa', (req, res) => {
    CaixaModel.buscaClientes()
        .then( results => res.status(200).json(results))
        .catch( error => res.status(400).json(error))
})

rotas.get('/caixa/:id', (req, res) => {
    CaixaModel.buscaClientePorId(req.params.id)
        .then( results => res.status(200).json(results[0]))
        .catch( error => res.status(400).json(error))
})

rotas.post('/caixa', (req, res) => {
    CaixaModel.adicionarCliente(req.body)
        .then( clienteCadastrado => res.status(200).json(clienteCadastrado))
        .catch( error => res.status(400).json(error))
})

rotas.put('/caixa/:id/sacar/:valor', (req, res) => {
    CaixaModel.saqueDinheiro(req.params.id, req.params.valor)
    .then( results => res.status(200).json(results))
    .catch( error => res.status(400).json(error))
})

rotas.put('/caixa/:id/depositar/:valor', (req, res) => {
    CaixaModel.depositDinheiro(req.params.id, req.params.valor)
    .then( results => res.status(200).json(results))
    .catch( error => res.status(400).json(error))
})

rotas.delete('/caixa/:id', (req, res) => {
    CaixaModel.deleteCliente(req.params.id)
        .then( results => res.status(200).json(results))
        .catch( error => res.status(400).json(error))
})

export default rotas
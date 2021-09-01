import express from "express"

const rotas = express.Router()

rotas.get('/caixa', (req, res) => {
    res.send('tuf tuf')
})

rotas.get('/caixa/:id', (req, res) => {

})

rotas.post('/caixa', (req, res) => {
    
})

rotas.put('/caixa/:id', (req, res) => {
    
})

rotas.delete('/caixa/:id', (req, res) => {

})
export default rotas
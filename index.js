import express from "express"
import rotas from "./controllers/caixa.js"
import db from "./database/config.js"

const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api', rotas)

app.get('/', (req, res) =>{ 
    res.send('Servidor rodando')
})

app.listen(port, ()=>{
    console.log('Servidor belezinha')
})

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const bodyParserJSON = bodyParser.json()

const app = express();

const PORT = process.PORT || 8080

app.use((request, response, next) => {
    response.header("Acess-Control-Allow-Origin", "*")
    response.header(
        "Acess-Control-Allow-Origin",
        "GET, POST, PUT, DELETE, OPTIONS",
    )
    app.use(cors())
    next()
})

app.listen(PORT, function (){
    console.log("API aguardando requisiçoes...")
})

const controllerUsuario = require('./controller/controller_usuario.js')
const controllerProduto = require('./controller/controller_produto.js')

//Login Usuario
app.post('/doceria/auth', cors(), bodyParserJSON, async (request, response) => {
    let usuario = request.body
    let contentType = request.headers['content-type']

    let login = await controllerUsuario.loginUsuario(usuario, contentType)
    response.status(login.status_code).json(login)
})

//Lista produtos
app.get('/doceria/produtos', cors(), async (request, response) => {
    let produtos = await controllerProduto.getProdutos()
    response.status(produtos.status_code).json(produtos)
})

//Insere novo produto
app.post('/doceria/produto', cors(), bodyParserJSON, async (request, response) => {
    let produto = request.body
    console.log(request.body)
    let contentType = request.headers['content-type']

    let novoProduto = await controllerProduto.novoProduto(produto, contentType)
    response.status(novoProduto.status_code).json(novoProduto)
})

//Atualiza produto
app.put('/doceria/produto/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let produto = request.body
    let contentType = request.headers['content-type']

    let novoProduto = await controllerProduto.updateProduto(produto, id, contentType)
    response.status(novoProduto.status_code).json(novoProduto)
})

//Deleta produto
app.delete('/doceria/produto/:id', cors(), async (request, response) => {
    let idProduto = request.params.id

    let deleteProduto = await controllerProduto.deleteProduto(idProduto)
    response.status(deleteProduto.status_code).json(deleteProduto)
})

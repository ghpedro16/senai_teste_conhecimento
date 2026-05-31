const produtoDAO = require('../model/produto.js')
const controllerEstoque = require('../controller/controller_estoque.js')

const getProdutos = async function () {
    try {
        let produtos = await produtoDAO.getProdutos()

        if (produtos) {
            let json = { status_code: 200, produtos: produtos }

            return json
        } else {
            let error = { status_code: 404, message: "Produtos não encontrados!" }
            return error
        }
    } catch (error) {
        return false
    }
}

const novoProduto = async function (produto, contentType) {
    try {
        if (String(contentType).toUpperCase().includes('APPLICATION/JSON')) {
            let produtoNovo = await produtoDAO.insertProduto(produto)

            if (produtoNovo) {

                let lastId = await produtoDAO.getUltimoProduto()
        
                for(stock of produto.estoque){
                    let estoqueJson = {quantidade: stock.quantidade, data_vencimento: stock.data_vencimento, fk_id_produto: lastId[0].id_produto}

                    let novoEstoque = await controllerEstoque.novoEstoque(estoqueJson, contentType)

                    if(novoEstoque.status_code != 201){
                        let erro = {status_code: 500, message: "Erro ao inserir produto no estoque"}
                    }
                }

                let json = { status_code: 201 }

                return json
            } else {
                let error = { status_code: 500, message: "Não foi possivel adicionar um novo produto!" }
                return error
            }
        } else {
            let bodyJson = { message: "O tipo de requisição precisa ser JSON!" }
            return bodyJson
        }
    } catch (error) {
        return false
    }
}

const updateProduto = async function (produto, id, contentType) {
    try {
        if (String(contentType).toUpperCase().includes('APPLICATION/JSON')) {
            let validarId = await produtoDAO.getProdutoId(id)

            if (validarId) {
                let produtoNovo = await produtoDAO.updateProduto(produto, id)

                if (produtoNovo) {
                    let json = { status_code: 200, produto: produtoNovo }

                    return json
                } else {
                    let error = { status_code: 500, message: "Não foi possivel atualizar o produto!" }
                    return error
                }
            } else {
                let error = { status_code: 404, message: "Produto não encontrado!" }
                return error
            }
        } else {
            let bodyJson = { message: "O tipo de requisição precisa ser JSON!" }
            return bodyJson
        }
    } catch (error) {
        return false
    }
}

const deleteProduto = async function (id) {
    try {
        let validarId = await produtoDAO.getProdutoId(id)

        if (validarId) {
            let produto = await produtoDAO.deleteProduto(id)

            if (produto) {
                let json = { status_code: 200,message: "Produto excluído com sucesso!"}

                return json
            } else {
                let error = { status_code: 500, message: "Não foi possivel deletar o produto!" }
                return error
            }
        } else {
            let error = { status_code: 404, message: "Produto não encontrado!" }
            return error
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getProdutos,
    novoProduto,
    updateProduto,
    deleteProduto
}
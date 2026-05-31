//cria conexao com banco
const db = require('../config/connection.js')

const getProdutoId = async function(id) {
    try {
        let dados = await db('tbl_produto')
        .select('*')
        .where('id_produto', id)

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getUltimoProduto = async function (){
    try {
        let dados = await db('tbl_produto')
        .select('id_produto')
        .orderBy('id_produto', 'desc')
        .limit(1)

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }   
}


const getProdutos = async function() {
    try {
        let dados = await db('tbl_produto as p')
        .join('tbl_estoque as e', 'p.id_produto', 'e.fk_id_produto')
        .select('p.id_produto', 'p.nome', 'p.preco', 'p.peso', 'e.quantidade', 'e.data_vencimento')

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const insertProduto = async function(produto) {
    try {
        let dados = await db('tbl_produto')
        .insert({
            nome: produto.nome,
            preco: produto.preco,
            peso: produto.peso,
            fk_id_usuario: produto.fk_id_usuario
        })

        if(dados.length > 0)
            return dados
        else
            return false
        
    } catch (error) {
        return false
    }
}

const updateProduto = async function(produto, id) {
    try {
        let dados = await db('tbl_produto')
        .update({
            nome: produto.nome,
            preco: produto.preco,
            peso: produto.peso
        })
        .where('id_produto', id)

        if(dados > 0)
            return dados
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteProduto = async function(id) {
    try {
        let dados = await db('tbl_produto')
        .where('id_produto', id)
        .del()

        if(dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }    
}

module.exports = {
    getProdutos,
    getProdutoId,
    getUltimoProduto,
    insertProduto,
    updateProduto,
    deleteProduto
}
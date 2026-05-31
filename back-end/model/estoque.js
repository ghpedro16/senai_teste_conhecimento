//cria conexao com banco
const db = require('../config/connection.js')

const insertEstoque = async function(estoque) {
    try {
        let dados = await db('tbl_estoque')
        .insert({
            quantidade: estoque.quantidade,
            data_vencimento: estoque.data_vencimento,
            fk_id_produto: estoque.fk_id_produto
        })

        if(dados.length > 0)
            return dados
        else
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertEstoque
}
//cria conexao com banco
const db = require('../config/connection.js')

const loginUsuario = async function(usuario) {
    try {
        let dados = await db('tbl_usuario')
        .select('*')
        .where({
            email: usuario.email,
            senha: usuario.senha
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
    loginUsuario
}
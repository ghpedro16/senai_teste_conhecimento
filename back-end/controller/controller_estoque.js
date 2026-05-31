const estoqueDAO = require('../model/estoque.js')

const novoEstoque = async function(estoque, contentType) {
    try {
        if(String(contentType).toUpperCase().includes('APPLICATION/JSON')){
            let novoEstoque = await estoqueDAO.insertEstoque(estoque)

            if(novoEstoque){
                let json = {status_code: 201}

                return json
            }else{
                let error = {status_code: 500, message: "Erro ao inserir no estoque!"}
                return error
            }
        }else{
            let bodyJson = {message: "O tipo de requisição precisa ser JSON!"}
            return bodyJson
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    novoEstoque
}
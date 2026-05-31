const usuarioDAO = require('../model/usuario.js')

const loginUsuario = async function(usuario, contentType) {
    try {
        if(String(contentType).toUpperCase().includes('APPLICATION/JSON')){
            let login = await usuarioDAO.loginUsuario(usuario)

            if(login){
                let json = {status_code: 200}

                return json
            }else{
                let error = {message: "Login incorreto!"}
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

module.exports = {loginUsuario}
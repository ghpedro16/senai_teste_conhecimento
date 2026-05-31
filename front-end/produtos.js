const API_URL = "http://localhost:8080"

// LISTAR PRODUTOS
async function listarProdutos() {

    try {

        const response = await fetch(
            `${API_URL}/doceria/produtos`
        )

        const dados = await response.json()

        const tabela = document.getElementById(
            "lista-produtos"
        )

        tabela.innerHTML = ""

        dados.produtos.forEach(produto => {

            tabela.innerHTML += `
                <tr>
                    <td>${produto.id_produto}</td>
                    <td>${produto.nome}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>${produto.peso}</td>

                    <td>
                        <button
                            class="btn-delete"
                            onclick="excluirProduto(${produto.id_produto})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `
        })

    } catch (error) {

        console.error(error)

        alert(
            "Erro ao carregar produtos."
        )
    }
}

// CADASTRAR PRODUTO
async function cadastrarProduto() {

    try {

        const nome =
            document.getElementById("nome").value

        const preco = Number(
            document.getElementById("preco").value
        )

        const peso = Number(
            document.getElementById("peso").value
        )

        const quantidade = Number(
            document.getElementById("quantidade").value
        )

        const data_vencimento =
            document.getElementById("data_vencimento").value

        const fk_id_usuario =
            localStorage.getItem("id_usuario")

        const produto = {
            nome,
            preco,
            peso,
            fk_id_usuario,
            estoque: [
                {
                    quantidade,
                    data_vencimento
                }
            ]
        }

        const response = await fetch(
            `${API_URL}/doceria/produto`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            }
        )

        const dados = await response.json()

        alert(
            dados.message ||
            "Produto cadastrado com sucesso!"
        )

        limparFormulario()

        listarProdutos()

    } catch (error) {

        console.error(error)

        alert(
            "Erro ao cadastrar produto."
        )
    }
}

async function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    )

    if (!confirmar) return

    try {

        const response = await fetch(
            `${API_URL}/doceria/produto/${id}`,
            {
                method: "DELETE"
            }
        )

        const dados = await response.json()

        alert(
            dados.message ||
            "Produto removido."
        )

        listarProdutos()

    } catch (error) {

        console.error(error)

        alert(
            "Erro ao excluir produto."
        )
    }
}

function limparFormulario() {

    document.getElementById("nome").value = ""

    document.getElementById("preco").value = ""

    document.getElementById("peso").value = ""

    document.getElementById("quantidade").value = ""

    document.getElementById("data_vencimento").value = ""
}

function logout() {

    localStorage.removeItem("id_usuario")

    window.location.href = "login.html"
}
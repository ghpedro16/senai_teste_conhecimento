async function login() {

    const email =
        document.getElementById("email").value

    const senha =
        document.getElementById("senha").value

    const response = await fetch(
        "http://localhost:8080/doceria/auth",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        }
    )

    const dados = await response.json()

    if (response.ok) {

        localStorage.setItem(
            "id_usuario",
            1
        )

        window.location.href =
            "produtos.html"

    } else {

        alert(
            dados.message ||
            "Usuário ou senha inválidos."
        )
    }
}
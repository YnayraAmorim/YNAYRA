// Validação básica
function validarLogin() {
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (usuario === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    return true;
}

// Mostrar/ocultar senha
function mostrarSenha() {
    const campo = document.getElementById('senha');
    campo.type = campo.type === "password" ? "text" : "password";
}

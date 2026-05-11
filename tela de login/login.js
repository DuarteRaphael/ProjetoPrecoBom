document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Define usuários válidos
    const usuarioCorreto = "admin";
    const senhaCorreta = "1234";

    // Pega os valores digitados
    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;

    // Validação
    if (usuarioDigitado === usuarioCorreto && senhaDigitada === senhaCorreta) {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html"; // Redireciona
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

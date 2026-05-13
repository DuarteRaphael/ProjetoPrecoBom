document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioCorreto = "admin";
    const senhaCorreta = "1234";

    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;

    if (usuarioDigitado === usuarioCorreto && senhaDigitada === senhaCorreta) {
        window.location.href = "../pagina inicial/pagina_inicial.html";
    } else {
        abrirModal();
    }
});

function abrirModal() {
    // Cria o overlay
    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.2s ease;
    `;

    // Cria o modal
    overlay.innerHTML = `
        <div style="
            background: #fff;
            border-radius: 12px;
            padding: 32px 28px;
            max-width: 360px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            animation: slideUp 0.25s ease;
        ">
            <div style="font-size: 48px; margin-bottom: 12px;">🔒</div>
            <h2 style="margin: 0 0 8px; font-size: 20px; color: #1a1a1a; font-family: sans-serif;">
                Acesso negado
            </h2>
            <p style="margin: 0 0 24px; color: #666; font-size: 15px; font-family: sans-serif;">
                Usuário ou senha incorretos.<br>Tente novamente.
            </p>
            <button onclick="fecharModal()" style="
                background: #e53935;
                color: #fff;
                border: none;
                border-radius: 8px;
                padding: 10px 28px;
                font-size: 15px;
                font-family: sans-serif;
                cursor: pointer;
                transition: background 0.2s;
            "
            onmouseover="this.style.background='#c62828'"
            onmouseout="this.style.background='#e53935'">
                Fechar
            </button>
        </div>
    `;

    // Fecha ao clicar fora
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) fecharModal();
    });

    document.body.appendChild(overlay);

    // Fecha com ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            fecharModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function fecharModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.remove();
}
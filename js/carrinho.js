// Carrega o carrinho salvo na sessão
let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

// Salva carrinho
function salvarCarrinho() {
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Atualiza o número no ícone do carrinho (nav)
function atualizarIconeCarrinho() {
    const span = document.getElementById("quantidade-carrinho");
    if (span) span.textContent = carrinho.length;
}

// Carrega itens no carrinho.html
function carregarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total-carrinho");

    if (!lista || !totalSpan) return;

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("item-carrinho");

        li.innerHTML = `
            <img src="${item.imagem}" class="miniatura-produto">

            <div class="info-item">
                <strong>${item.nome}</strong>
                <span>${item.preco}</span>
            </div>

            <button class="remover" onclick="removerItem(${index})">
                Remover
            </button>
        `;

        lista.appendChild(li);

        // Converter "R$129,99" → 129.99
        const precoNumerico = parseFloat(
            item.preco.replace("R$", "").replace(",", ".")
        );

        total += precoNumerico;
    });

    totalSpan.textContent = total.toFixed(2);

    // SALVAR TOTAL NO SESSIONSTORAGE PARA O CHECKOUT
    sessionStorage.setItem("totalCarrinho", total.toFixed(2));
}

// Remover item individual
function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    carregarCarrinho();
    atualizarIconeCarrinho();
}

// Limpar carrinho inteiro
function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    carregarCarrinho();
    atualizarIconeCarrinho();
}

// Quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    carregarCarrinho();
    atualizarIconeCarrinho();

    // BOTÃO "LIMPAR CARRINHO"
    const botaoLimpar = document.getElementById("limpar-carrinho");
    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", limparCarrinho);
    }
});

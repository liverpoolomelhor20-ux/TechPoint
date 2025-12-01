// checkout.js
document.addEventListener("DOMContentLoaded", () => {

    // Pega o carrinho e o total salvo no sessionStorage
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    const totalSalvo = sessionStorage.getItem("totalCarrinho") || "0.00";

    // Elementos do checkout
    const listaCheckout = document.getElementById("lista-checkout");
    const totalCheckout = document.getElementById("total-checkout");

    // Função para carregar os itens no checkout
    function carregarCheckout() {
        listaCheckout.innerHTML = "";

        if (carrinho.length === 0) {
            listaCheckout.innerHTML = "<li>Seu carrinho está vazio.</li>";
        } else {
            carrinho.forEach(item => {
                const li = document.createElement("li");
                li.classList.add("item-checkout");

                li.innerHTML = `
                    <img src="${item.imagem}" class="miniatura-produto">
                    <div class="info-item">
                        <strong>${item.nome}</strong>
                        <span>${item.preco}</span>
                    </div>
                `;

                listaCheckout.appendChild(li);
            });
        }

        // Atualiza o total usando o valor salvo
        totalCheckout.textContent = totalSalvo;
    }

    // Chama a função ao carregar
    carregarCheckout();
});

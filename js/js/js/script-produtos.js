// --- CRIAÇÃO DO BOTÃO ENTRAR NO MENU ---
let nav = document.querySelector("nav ul");

let botaoLogin = document.createElement("li");
botaoLogin.innerHTML = `<a href="#" id="btnLogin">Entrar</a>`;
nav.append(botaoLogin);

// --- MODAL DE LOGIN CRIADO PELO JS ---
let modal = document.createElement("div");
modal.id = "modalLogin";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.7)";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";

modal.innerHTML = `

<div id="caixaLogin" style="
        background:white;
        padding:20px;
        border-radius:10px;
        width:320px;
        text-align:center;
        font-family:Arial, sans-serif;
        position:relative;
    ">
    <h2 class="titulo-entrar">Entrar</h2>

    <!-- EMAIL -->
    <div style="width:90%; margin:10px auto; display:block;">
        <input type="email" id="inputEmail" placeholder="Seu email"
            style="width:100%; padding:10px; display:block; border:1px solid #ccc; border-radius:5px;">
    </div>

    <!-- SENHA -->
    <div style="width:90%; margin:10px auto; display:block; position:relative;">
        <input type="password" id="senha" placeholder="Senha"
            style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">
        <span id="verSenha1" style="
            position:absolute; right:10px; top:50%;
            transform:translateY(-50%); cursor:pointer; font-size:18px;
        "></span>
    </div>

    <!-- CONFIRMAR SENHA -->
    <div style="width:90%; margin:10px auto; display:block; position:relative;">
        <input type="password" id="confirmar-senha" placeholder="Confirmar senha"
            style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">
        <span id="verSenha2" style="
            position:absolute; right:10px; top:50%;
            transform:translateY(-50%); cursor:pointer; font-size:18px;
        "></span>
    </div>

    <!-- BOTÕES MANTIDOS COMO ESTAVAM -->
    <button id="confirmarLogin" style="
        padding:10px 20px; cursor:pointer; margin-top:10px;
        background:#333; color:white; border:none; border-radius:5px;
    ">Confirmar</button>

    <button id="fecharLogin" style="
        padding:10px 20px; cursor:pointer; margin-top:10px;
        background:#777; color:white; border:none; border-radius:5px;
    ">Sair</button>

</div>

`;
document.body.append(modal);

// --- FUNÇÃO PARA ABRIR O MODAL ---
document.querySelector("#btnLogin").onclick = function() {
    modal.style.display = "flex";
};

// --- FUNÇÃO PARA CONFIRMAR LOGIN ---
document.querySelector("#confirmarLogin").onclick = function() {
    let email = document.querySelector("#inputEmail").value;
    let senha = document.querySelector("#senha").value;
    let confirmar = document.querySelector("#confirmar-senha").value;

    if (email.trim() === "" || senha.trim() === "" || confirmar.trim() === "") {
        alert("Preencha todas as informações.");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem.");
        return;
    }

    // Salvar no sessionStorage para manter login apenas enquanto a aba está aberta
    sessionStorage.setItem("logado", "true");
    sessionStorage.setItem("usuario", email);

    document.querySelector("#btnLogin").innerHTML = "Minha Conta";
    modal.style.display = "none";
};

// --- SE A PESSOA JÁ ESTIVER LOGADA AO ENTRAR NA PÁGINA ---
if (sessionStorage.getItem("logado") === "true") {
    document.querySelector("#btnLogin").innerHTML = "Minha Conta";
}

// --- BLOQUEAR BOTÃO "VER MAIS" SE NÃO ESTIVER LOGADO ---
let botoesVerMais = document.querySelectorAll(".card-produto a");

botoesVerMais.forEach(function(botao) {
    botao.onclick = function(evento) {
        if (sessionStorage.getItem("logado") !== "true") {
            evento.preventDefault();
            alert("Você precisa estar logado para ver os detalhes do produto.");
            modal.style.display = "flex";
        }
    };
});

// --- FECHAR MODAL ---
document.querySelector("#fecharLogin").onclick = function() {
    modal.style.display = "none";
};

// --- BARRA DE PESQUISA ---
let barraPesquisa = document.createElement("input");
barraPesquisa.placeholder = "Pesquisar produto...";
barraPesquisa.id = "pesquisar";
barraPesquisa.style.padding = "10px";
barraPesquisa.style.width = "60%";
barraPesquisa.style.margin = "70px auto";
barraPesquisa.style.display = "block";
barraPesquisa.style.fontSize = "16px";

let section = document.querySelector(".produtos");
section.insertBefore(barraPesquisa, document.querySelector(".grade-produtos"));

// --- FUNÇÃO DA BARRA DE PESQUISA ---
barraPesquisa.addEventListener("input", function() {
    let texto = barraPesquisa.value.toLowerCase();

    let cards = document.querySelectorAll(".card-produto");

    cards.forEach(function(card) {
        let nome = card.querySelector("h2").innerHTML.toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// --- MOSTRAR / OCULTAR SENHA ---
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

toggleSenha.addEventListener("click", () => {
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        toggleSenha.textContent = "Ocultar";
    } else {
        senhaInput.type = "password";
        toggleSenha.textContent = "Mostrar";
    }
});

// --- VALIDAR CONFIRMAR SENHA ---
const confirmarInput = document.getElementById("confirmar-senha");
const erroSenha = document.getElementById("erro-senha");

function validarSenhas() {
    if (confirmarInput.value !== senhaInput.value) {
        erroSenha.textContent = "As senhas não coincidem!";
    } else {
        erroSenha.textContent = "";
    }
}

senhaInput.addEventListener("input", validarSenhas);
confirmarInput.addEventListener("input", validarSenhas);

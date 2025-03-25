document.addEventListener("DOMContentLoaded", function() { 
    // Carregar o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let resumoPedido = document.getElementById("resumo-pedido");
    let totalFinal = document.getElementById("total-final");
    let total = 0;

    // Verificar se o carrinho está vazio
    if (carrinho.length === 0) {
        resumoPedido.innerHTML = "<li>Seu carrinho está vazio!</li>";
        totalFinal.textContent = "0,00";
        document.getElementById("limpar-carrinho").style.display = "none"; // Ocultar o botão
        return;
    }

    // Exibir os itens do carrinho
    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.produto} - Tamanho: ${item.tamanho} - R$ ${item.preco},00`;
        resumoPedido.appendChild(li);
        total += item.preco;
    });

    // Atualizar o total final
    totalFinal.textContent = total.toFixed(2);

    // Exibir o botão de limpar carrinho se houver itens
    document.getElementById("limpar-carrinho").style.display = "inline"; // Exibir o botão


    // Atualizar o total final
    totalFinal.textContent = total.toFixed(2);
});

function confirmarPedido() {
    // Coletar os dados do cliente
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;

    // Verificar se os campos estão preenchidos
    if (!nome || !email || !endereco) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Exibir mensagem de confirmação
    alert(`Pedido confirmado! Você receberá um e-mail com os detalhes.`);
    
    // Limpar o carrinho após a compra
    localStorage.removeItem("carrinho");
    
    // Redirecionar para a página inicial ou página de confirmação
    window.location.href = "../index.html";
}

function limparCarrinho() {
    // Limpar o carrinho do localStorage
    localStorage.removeItem("carrinho");

    // Atualizar a interface para refletir que o carrinho está vazio
    let resumoPedido = document.getElementById("resumo-pedido");
    let totalFinal = document.getElementById("total-final");

    // Limpar os elementos do carrinho na interface
    resumoPedido.innerHTML = "<li>Seu carrinho está vazio!</li>";
    totalFinal.textContent = "0,00";

    // Ocultar o botão de limpar carrinho, pois não há itens no carrinho
    document.getElementById("limpar-carrinho").style.display = "none";
}


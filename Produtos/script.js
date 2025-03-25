    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];  

    let tamanhoSelecionado = null;  // Variável para armazenar o tamanho selecionado
    let produtoSelecionado = null;  // Variável para armazenar o produto que foi adicionado ao carrinho

    // Função para adicionar ao carrinho
    function adicionarAoCarrinho(produto, preco) {
        // Salva o produto e o preço para uso posterior quando o tamanho for escolhido
        produtoSelecionado = { produto, preco };
        
        // Exibe o modal para selecionar o tamanho
        modal.style.display = "flex";  // Só exibe o modal quando o botão for clicado
    }

    // Função para salvar no carrinho
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    // Função para atualizar a lista de produtos no carrinho
function atualizarCarrinho() {
    let listaCarrinho = document.getElementById("lista-carrinho");
    let totalPreco = document.getElementById("total-preco");
    let cartCount = document.getElementById("cart-count");
    let finalizarCompraBtn = document.getElementById("finalizar-compra");
    let limparCarrinhoBtn = document.getElementById("limpar-carrinho");

    listaCarrinho.innerHTML = ""; // Limpa a lista de carrinho
    let total = 0;

    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<li>Seu carrinho está vazio!</li>";
        totalPreco.textContent = "0,00";
        cartCount.textContent = "0";
        finalizarCompraBtn.style.display = "none";
        limparCarrinhoBtn.style.display = "none"; // Não mostra o botão de limpar carrinho
    } else {
        // Se o carrinho não estiver vazio
        carrinho.forEach((item, index) => {
            total += item.preco;
            let li = document.createElement("li");
            li.innerHTML = `${item.produto} - Tamanho: ${item.tamanho} - R$ ${item.preco},00 <button onclick="removerDoCarrinho(${index})">❌</button>`;
            listaCarrinho.appendChild(li);
        });

        // Atualiza o total e contador
        totalPreco.textContent = total.toFixed(2);
        cartCount.textContent = carrinho.length;
        
        finalizarCompraBtn.style.display = carrinho.length > 0 ? "block" : "none"; // Mostrar botão de finalizar compra
        limparCarrinhoBtn.style.display = carrinho.length > 0 ? "block" : "none"; // Mostrar botão de limpar carrinho
    }
}

// Função para limpar o carrinho
function limparCarrinho() {
    // Limpar o carrinho no localStorage
    localStorage.removeItem("carrinho");

    // Atualizar a interface
    carrinho = []; // Esvaziar o array de carrinho
    atualizarCarrinho(); // Atualizar a lista de carrinho
}

    // Função para remover do carrinho
    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        salvarCarrinho();
        atualizarCarrinho();
    }

    // Código para exibir o tamanho selecionado no modal
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    const sizeOptions = document.querySelectorAll(".size-option");
    const selectedSizeText = document.getElementById("selected-size");

    // Lógica para quando o modal for aberto
    document.querySelectorAll(".adicionadoAoCarrinho").forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "flex";  // Só abre o modal quando o botão é clicado
        });
    });

    // Fechar modal ao clicar no "X"
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Lógica de seleção de tamanho
    sizeOptions.forEach(option => {
        option.addEventListener("click", () => {
            // Remove a classe "selected" de todas as opções
            sizeOptions.forEach(opt => opt.classList.remove("selected"));

            // Adiciona "selected" à opção clicada
            option.classList.add("selected");

            // Atualiza o texto abaixo do modal
            selectedSizeText.textContent = `Tamanho selecionado: ${option.dataset.size}`;

            // Armazena o tamanho selecionado
            tamanhoSelecionado = option.dataset.size;
        });
    });

    // Lógica para o botão de "Confirmar Compra"
    document.getElementById("confirmar-compra").addEventListener("click", () => {
        // Verifica se um tamanho foi selecionado
        if (!tamanhoSelecionado) {
            alert("Selecione um tamanho para o produto!");
            return;
        }

        // Adiciona o produto com o tamanho ao carrinho
        carrinho.push({ ...produtoSelecionado, tamanho: tamanhoSelecionado });

        salvarCarrinho();
        atualizarCarrinho();

        // Fecha o modal
        modal.style.display = "none";

        // Limpa as variáveis de tamanho e produto
        tamanhoSelecionado = null;
        produtoSelecionado = null;  // Limpa o produto selecionado
    });

    // Ao carregar a página, garantir que o modal esteja escondido e o carrinho persistente
    window.addEventListener('load', () => {
        modal.style.display = "none";  // Modal começa oculto
        atualizarCarrinho();  // Atualiza o carrinho na primeira carga da página
    });

    function filtrarProdutos(categoria) {
        let produtos = document.querySelectorAll(".produto");
    
        produtos.forEach((produto) => {
            let nome = produto.querySelector("h3").textContent.toLowerCase();
            if (categoria === "todos") {
                produto.style.display = "block";
            } else if (categoria === "vestido" && nome.includes("vestido")) {
                produto.style.display = "block";
            } else if (categoria === "calça" && nome.includes("calça")) {
                produto.style.display = "block";
            } else if (categoria === "blusa" && nome.includes("blusa")) {
                produto.style.display = "block";
            } else if (categoria === "cropped" && nome.includes("cropped")) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    }





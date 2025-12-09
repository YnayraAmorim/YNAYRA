<script>
    // --- CONFIGURAÇÕES DA META ---
    // **** CORREÇÃO AQUI: Defina suas variáveis DENTRO do script ****
    const metaDoacao = 5000;    // Defina sua meta aqui (ex: R$ 5.000)
    let valorAtual = 1250;      // Defina o valor inicial arrecadado (ex: R$ 1.250)

    // --- ELEMENTOS DO DOM ---
    const selecaoContainer = document.getElementById('selecao-tipo-usuario');
    const doadorContainer = document.getElementById('form-doador-container');
    const recebedorContainer = document.getElementById('form-recebedor-container');
    
    const btnDoador = document.getElementById('btn-doador');
    const btnRecebedor = document.getElementById('btn-recebedor');
    
    // **** CORREÇÃO AQUI: O ID deve estar no <form> ****
    const cadastroFormDoador = document.getElementById('cadastroFormDoador'); 
    
    const valorInput = document.getElementById('valor');
    const progressBarFill = document.getElementById('progressBarFill');
    const valorArrecadadoSpan = document.getElementById('valorArrecadado');
    const valorMetaSpan = document.getElementById('valorMeta');

    // --- FUNÇÕES ---
    function copiarPix() {
        const pixInput = document.getElementById('pix-codigo');
        pixInput.select();
        pixInput.setSelectionRange(0, 99999);
        try {
            document.execCommand('copy');
            alert('Código PIX copiado!');
        } catch (err) {
            alert('Não foi possível copiar o código.');
        }
    }

    // Esta é a função principal da barra de progresso
    function atualizarBarra() {
        // 1. Calcula a porcentagem
        // Math.min garante que não passe de 100%
        const porcentagem = Math.min((valorAtual / metaDoacao) * 100, 100);
        
        // 2. Atualiza o CSS da barra azul
        progressBarFill.style.width = `${porcentagem}%`;
        
        // 3. Atualiza o texto da porcentagem dentro da barra
        progressBarFill.textContent = `${Math.round(porcentagem)}%`;
        
        // 4. Formata os valores como moeda (R$)
        const formatoMoeda = { style: 'currency', currency: 'BRL' };
        valorArrecadadoSpan.textContent = "Arrecadado: " + valorAtual.toLocaleString('pt-BR', formatoMoeda);
        valorMetaSpan.textContent = "Meta: " + metaDoacao.toLocaleString('pt-BR', formatoMoeda);
    }

    // --- EVENT LISTENERS ---
    btnDoador.addEventListener('click', () => {
        selecaoContainer.style.display = 'none';
        doadorContainer.style.display = 'block';
    });

    btnRecebedor.addEventListener('click', () => {
        selecaoContainer.style.display = 'none';
        recebedorContainer.style.display = 'block';
    });

    // "Ouve" o envio do formulário de doação
    if (cadastroFormDoador) { // Verifica se o formulário existe
        cadastroFormDoador.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede a página de recarregar
            
            // Pega o valor digitado no campo "Valor a ser doado"
            const valorDoado = parseFloat(valorInput.value);
            
            // Se for um valor válido, soma ao total
            if (!isNaN(valorDoado) && valorDoado > 0) {
                valorAtual += valorDoado; // Adiciona a doação ao valor total
                atualizarBarra();         // Atualiza a barra com o novo total
                valorInput.value = '';    // Limpa o campo de valor
            }
            alert('Muito obrigado pelo seu apoio! Sua doação foi registrada.');
        });
    }


    // --- INICIALIZAÇÃO ---
    // Chama a função assim que a página carrega para mostrar o estado inicial
    window.onload = atualizarBarra;
</script>
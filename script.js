const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result'); 

async function convert() {
    const from = fromCurrency.value.toUpperCase();
    const to = toCurrency.value.toUpperCase();
    const amount = amountInput.value;

    if (amount === "" || amount <= 0) {
        result.innerText = "Por favor, insira um valor válido.";
        return;
    }

    
    result.innerText = "Buscando cotação...";

    try {
        const url = (`https://economia.awesomeapi.com.br/json/last/${from}-${to}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Par de moedas não encontrado ou erro no servidor.");
        }

        const data = await response.json();

        console.log("URL chamada:", url);
        console.log("O que a API devolveu:", data);

        const pair = `${from}${to}`;
        
        if (!data[pair]) {
            throw new Error("Dados da moeda não disponíveis.");
        }

        const rate = data[pair].bid;
        const totalValue = amount * rate;

        const totalFormatted = totalValue.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: to 
        });

        result.innerText = `${amount} ${from} = ${totalFormatted}`;

    } catch (error) {
        console.error("Erro na conversão:", error.message);
        result.innerText = "Erro ao buscar cotação. Verifique a conexão ou as moedas.";
    }
}

if (convertBtn) {
    convertBtn.addEventListener('click', convert);
}
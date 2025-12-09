// Substitua pela URL do seu Apps Script Web App
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_WEBAPP_ID/exec';


async function fetchData(){
const res = await fetch(APPS_SCRIPT_URL + '?action=get');
const data = await res.json();
return data; // {saldoInicial, transacoes: [...], totalsByCategory: {...}}
}


function formatMoney(v){
return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
}


function render(data){
document.getElementById('saldo-inicial').textContent = formatMoney(data.saldoInicial || 0);
const entradas = data.transacoes.filter(t => t.tipo === 'entrada').reduce((s,x)=>s+Number(x.valor),0);
const saidas = data.transacoes.filter(t => t.tipo === 'saida').reduce((s,x)=>s+Number(x.valor),0);
const saldoFinal = (Number(data.saldoInicial||0) + entradas - saidas);
document.getElementById('total-entradas').textContent = formatMoney(entradas);
document.getElementById('total-saidas').textContent = formatMoney(saidas);
document.getElementById('saldo-final').textContent = formatMoney(saldoFinal);
document.getElementById('saldo-status').textContent = `Atualizado em ${new Date().toLocaleString()}`;


// tabela
const tbody = document.querySelector('#transacoes-table tbody');
tbody.innerHTML = '';
data.transacoes.slice().reverse().slice(0,50).forEach(t => {
const tr = document.createElement('tr');
tr.innerHTML = `<td>${t.data}</td><td>${t.tipo}</td><td>${t.categoria}</td><td>${t.descricao}</td><td>${formatMoney(Number(t.valor)||0)}</td>`;
tbody.appendChild(tr);
});


// categorias
const catWrap = document.getElementById('categorias-list');
catWrap.innerHTML = '';
Object.entries(data.totalsByCategory || {}).forEach(([cat, value]) =>{
const el = document.createElement('div'); el.className='cat';
el.innerHTML = `<strong>${cat}</strong><div>${formatMoney(value)}</div>`;
catWrap.appendChild(el);
});
}


// Inicialização
(async ()=>{
try{
const data = await fetchData();
render(data);
}catch(e){
console.error(e);
document.getElementById('saldo-status').textContent = 'Erro ao carregar dados';
}
})();
let entradas = [];
let saidas = [];

function atualizarSaldo() {
    let totalEntradas = entradas.reduce((acc, v) => acc + v.valor, 0);
    let totalSaidas = saidas.reduce((acc, v) => acc + v.valor, 0);

    let saldo = totalEntradas - totalSaidas;

    document.getElementById("saldo").textContent =
        saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function addEntrada() {
    let desc = document.getElementById("entrada-desc").value;
    let valor = parseFloat(document.getElementById("entrada-valor").value);

    if (!desc || !valor) return alert("Preencha todos os campos!");

    entradas.push({ descricao: desc, valor });

    let linha = `<tr><td>${desc}</td><td>${valor.toFixed(2)}</td></tr>`;
    document.getElementById("lista-entradas").innerHTML += linha;

    document.getElementById("entrada-desc").value = "";
    document.getElementById("entrada-valor").value = "";

    atualizarSaldo();
}

function addSaida() {
    let desc = document.getElementById("saida-desc").value;
    let valor = parseFloat(document.getElementById("saida-valor").value);

    if (!desc || !valor) return alert("Preencha todos os campos!");

    saidas.push({ descricao: desc, valor });

    let linha = `<tr><td>${desc}</td><td>${valor.toFixed(2)}</td></tr>`;
    document.getElementById("lista-saidas").innerHTML += linha;

    document.getElementById("saida-desc").value = "";
    document.getElementById("saida-valor").value = "";

    atualizarSaldo();
}

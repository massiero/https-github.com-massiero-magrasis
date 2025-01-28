function calcularTudo() {
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const atividade = parseFloat(document.getElementById('atividade').value);
    const metaPeso = parseFloat(document.getElementById('meta-peso').value);
    const tempoMeta = parseFloat(document.getElementById('tempo-meta').value);
    const novoAtividade = parseFloat(document.getElementById('novo-atividade').value);

    const resultadoIMC = document.getElementById('resultado-imc');
    const resultadoTMB = document.getElementById('resultado-tmb');
    const resultadoGasto = document.getElementById('resultado-gasto');
    const resultadoDeficit = document.getElementById('resultado-deficit');
    const btnDicas = document.getElementById('btn-dicas');
    const tabelaDicas = document.getElementById('tabela-dicas');

    if (isNaN(altura) || isNaN(peso) || isNaN(idade) || isNaN(metaPeso) || isNaN(tempoMeta) || altura <= 0 || peso <= 0 || idade <= 0 || metaPeso <= 0 || tempoMeta <= 0) {
        resultadoIMC.textContent = 'Por favor, insira valores válidos para altura, peso, idade, meta de peso e tempo para meta.';
         resultadoTMB.textContent = '';
        resultadoGasto.textContent = '';
        resultadoDeficit.textContent = '';
        btnDicas.style.display = 'none';
        tabelaDicas.style.display = 'none';
        return;
    }

    // Calcula IMC
    const imc = peso / (altura * altura);
    let classificacao = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc < 35) {
        classificacao = 'Obesidade grau 1';
    } else if (imc < 40) {
        classificacao = 'Obesidade grau 2';
    } else {
        classificacao = 'Obesidade grau 3';
    }

    resultadoIMC.textContent = `Seu IMC é ${imc.toFixed(2)}. Classificação: ${classificacao}`;

    // Calcula TMB (corrigido para usar altura em cm)
    let tmb;
    if (sexo === 'masculino') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * (altura * 100)) - (5.677 * idade);
    } else {
        tmb = 447.593 + (9.247 * peso) + (3.098 * (altura * 100)) - (4.330 * idade);
    }
    resultadoTMB.textContent = `Sua Taxa Metabólica Basal (TMB) é: ${tmb.toFixed(2)} calorias`;

    // Calcula Gasto Calórico
    const gastoCalorico = tmb * atividade;
    resultadoGasto.textContent = `Seu gasto calórico diário estimado é: ${gastoCalorico.toFixed(2)} calorias`;

    // Calcula Déficit Calórico
    const pesoPerder = peso - metaPeso;
    const novoGastoCalorico = tmb * novoAtividade;
    const deficitCalorico =  (pesoPerder * 7700) / (tempoMeta * 30);
    const caloriasDiarias = novoGastoCalorico - deficitCalorico;
    

    if (pesoPerder <= 0) {
         resultadoDeficit.textContent = `Você não precisa de déficit calórico, pois sua meta de peso é igual ou maior que seu peso atual.`;
    } else {
        resultadoDeficit.textContent = `Seu déficit calórico é de ${deficitCalorico.toFixed(2)} calorias. Para emagrecer ${pesoPerder.toFixed(2)}kg e chegar a ${metaPeso.toFixed(2)}Kg você deve consumir ${caloriasDiarias.toFixed(2)} calorias por dia, no período de ${tempoMeta.toFixed(2)} meses.`;
    }
    btnDicas.style.display = 'block';
    tabelaDicas.style.display = 'none';
}

function mostrarDicas() {
    const tabelaDicas = document.getElementById('tabela-dicas');
    tabelaDicas.style.display = tabelaDicas.style.display === 'none' ? 'block' : 'none';
    calcularTotalCalorias();
}

function calcularTotalCalorias() {
    const tabela = document.getElementById('tabela-dicas');
    const linhas = tabela.querySelectorAll('tbody tr');
    let totalCalorias = 0;

    linhas.forEach(linha => {
        const caloria = parseFloat(linha.getAttribute('data-caloria'));
        const input = linha.querySelector('.porcoes-input');
        const porcoes = parseInt(input.value) || 0;
        totalCalorias += caloria * porcoes;
    });

    document.getElementById('total-calorias').textContent = totalCalorias;
}

document.addEventListener('input', function(e) {
    if (e.target && e.target.classList.contains('porcoes-input')) {
        calcularTotalCalorias();
    }
});

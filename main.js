//variáveis globais
const consoleResultado = document.getElementById('resultado');
const ultimaConta = document.getElementById('conta');
let entradas = [];
let saidaArray = '';
let saidaVisor = '';
let inputuser = '';
let tamanhoTexto = '';
let cmdPonto = '';

function resultadoCalculo() {
    if (saidaArray !== ''|| entradas.length > 0) {
        if (saidaArray == '(-'){
            saidaArray = '';
        }
        let primeirosDoisDigitos = saidaArray.substring(0,2);
        if (primeirosDoisDigitos === '(-'){
            saidaArray += ')'
        }
        if (saidaArray != '') {
            entradas.push(saidaArray);
        }
        //Remove o ultimo valor do array, caso seja um operador
        const ultimaEntrada = entradas[entradas.length - 1];
        if (['+', '-', 'x', '÷'].includes(ultimaEntrada)) {
            entradas = entradas.slice(0, -1);
        }
        
        //cria texto para calculo com eval e texto de expressão
        let textoUltimaConta = '';
        let valorUltimaConta = '';
        for (let i = 0; i <= entradas.length -1; i++){
            textoUltimaConta += entradas[i];
            if (entradas[i] == 'x'){
                valorUltimaConta += '*';
            } else if (entradas[i] == '÷') {
                valorUltimaConta += '/';
            } else {
                valorUltimaConta += entradas[i];
            }
        }
        //variáveis e saídas
        entradas=[];
        saidaArray = eval(valorUltimaConta);
        let x = saidaArray;
        let contRound = 10;
        
        if (x.toString().length > 13) {
            for (let i = 0; i < 10; i++){
                if (x.toString().length > 13) {
                    contRound = contRound - 1;
                }
            }
            if (x.toString().length > 13) {
                consoleResultado.innerHTML = "Limite de caracteres"
                ultimaConta.innerHTML = `Entradas: ${textoUltimaConta} = ${parseFloat(saidaArray).toFixed(4)}`;
            } else {
                consoleResultado.innerHTML = parseFloat(saidaArray).toFixed(contRound);
                ultimaConta.innerHTML = `Entradas: ${textoUltimaConta}`;
            }
        } else{
            consoleResultado.innerHTML = saidaArray;
            ultimaConta.innerHTML = `Entradas: ${textoUltimaConta}`;
        }
        let y = saidaArray;
        tamanhoTexto = y.toString();
        saidaArray = saidaArray.toString();
    }
}

function saidaValores(){
    tamanhoTexto += inputuser;
    consoleResultado.innerHTML += inputuser;
}

function limparCalc(){
    entradas = [];
    saidaArray='';
    saidaVisor='';
    tamanhoTexto='';
    consoleResultado.innerHTML='';
    ultimaConta.innerHTML='';
}

function operacaoPorcentagem(){
    if (saidaArray != '') {
        let resultadoPercentual='';
        if (entradas.length == 0){
            let valorPercentual = saidaArray;
            if (valorPercentual.substring(0,2) === '(-'){
                valorPercentual = valorPercentual.slice(2);
                resultadoPercentual = parseFloat(valorPercentual/100);
                resultadoPercentual = '(-' + resultadoPercentual.toString();
            } else {
                resultadoPercentual = parseFloat(valorPercentual/100);
                resultadoPercentual = resultadoPercentual.toString();
            }
            entradas.push(resultadoPercentual);
            inputuser = resultadoPercentual;
            saidaArray = inputuser;
            consoleResultado.innerHTML = inputuser;
            entradas.pop();
        } else {
            if (entradas.length > 0){
                let valorPercentual = saidaArray;
                let textConsole = '';
                if (valorPercentual.substring(0,2) === '(-'){
                    valorPercentual = valorPercentual.slice(2);
                    if (entradas[entradas.length-1] == '+' || entradas[entradas.length-1] == '-'){;
                        resultadoPercentual = parseFloat(valorPercentual/100)*entradas[entradas.length-2];
                    } else {
                        resultadoPercentual = parseFloat(valorPercentual/100);
                    }
                    resultadoPercentual = '(-' + resultadoPercentual.toString();
                } else {
                    if (entradas[entradas.length-1] == '+' || entradas[entradas.length-1] == '-'){;
                        resultadoPercentual = parseFloat(valorPercentual/100)*entradas[entradas.length-2];
                    } else {
                        resultadoPercentual = parseFloat(valorPercentual/100);
                    }
                    resultadoPercentual = resultadoPercentual.toString();
                }
                if (resultadoPercentual.length > 13) {
                    resultadoPercentual = parseFloat(resultadoPercentual).toFixed(4).toString();
                }
                entradas.push(resultadoPercentual);
                inputuser = resultadoPercentual;
                saidaArray = inputuser;
                saidaArray = saidaArray.toString();
                entradas.push(saidaArray);
                for (let i = 0; i < entradas.length-1; i++) {
                    textConsole += entradas[i];
                }
                consoleResultado.innerHTML = textConsole;
                entradas.pop();
                entradas.pop();
                
            }
        }
    }
}

function operacaoMaisMenos(){
    let novoTexto = '';
    if (saidaArray !== '') {
        saidaArray = saidaArray.toString();
        if (saidaArray.substring(0,2) === '(-'){
            let valorConvertido = 0;
            let textConsole = '';
            if (entradas.length > 0) {
                novoTexto = '';
                for (let i = 0; i < entradas.length; i++){
                    novoTexto += entradas[i];
                }
            }
            saidaArray = saidaArray.slice(2);
            novoTexto += saidaArray;
            consoleResultado.innerHTML = novoTexto;
        } else {
            entradas.push(saidaArray);
            novoTexto = ''
            for (let i = 0; i < entradas.length; i++) {
                novoTexto += entradas[i];
            }
            saidaArray = '(-' + saidaArray;
            entradas.pop();
            novoTexto = ''
            for (let i = 0; i < entradas.length; i++) {
                novoTexto += entradas[i];
            }           
            consoleResultado.innerHTML = novoTexto + saidaArray;
        }
    } else {
        inputuser = '(-';
        if (tamanhoTexto.length <= 13){
            saidaArray += inputuser;
            saidaValores();
        }
    }
}

function corrigeOperacao(){
    //Remove NaN
    for (let i = 0; i <= entradas.length -1; i++) {
        if (isNaN(entradas[i]) == true){
            if (entradas[i] != '+' && entradas[i] != '-' && entradas[i] != '÷' && entradas[i] != 'x'){
                entradas.splice(i,i);
                i = 0;
            }
        }
    }
    
    consoleResultado.innerHTML = '';
    for (let i = 0; i <= entradas.length - 1; i++){
        consoleResultado.innerHTML += entradas[i];
    }
}

function operacaoSoma(){
    if (saidaArray != '' && saidaArray.substr(-2) !== '(-') {
        cmdPonto = '';
        if (ultimaConta.textContent != ''){
            ultimaConta.innerHTML = '';
        }
        let primeirosDoisDigitos = saidaArray.substring(0,2);
        if (primeirosDoisDigitos === '(-'){
            saidaArray += ')'
        }
        entradas.push(saidaArray);
        inputuser = '+'
        entradas.push(inputuser);
        saidaValores();
        saidaArray = '';
    }
    const ultimaEntrada = entradas[entradas.length - 1];
    if (['+', '-', 'x', '÷'].includes(ultimaEntrada)) {
        entradas = entradas.slice(0, -1);
        inputuser = '+';
        entradas.push(inputuser);
        consoleResultado.innerHTML = '';
        for (let i = 0; i <= entradas.length - 1; i++){
            consoleResultado.innerHTML += entradas[i];
        }
    }
}


function operacaoSubtracao(){
    if (saidaArray != '' && saidaArray.substr(-2) !== '(-') {
        cmdPonto = '';
        if (ultimaConta.textContent != ''){
            ultimaConta.innerHTML = '';
        }
        let primeirosDoisDigitos = saidaArray.substring(0,2);
        if (primeirosDoisDigitos === '(-'){
            saidaArray += ')'
        }
        entradas.push(saidaArray);
        inputuser = '-'
        entradas.push(inputuser);
        saidaValores();
        saidaArray = '';
    }
    const ultimaEntrada = entradas[entradas.length - 1];
    if (['+', '-', 'x', '÷'].includes(ultimaEntrada)) {
        entradas = entradas.slice(0, -1);
        inputuser = '-';
        entradas.push(inputuser);
        consoleResultado.innerHTML = '';
        for (let i = 0; i <= entradas.length - 1; i++){
            consoleResultado.innerHTML += entradas[i];
        }
    }
}

function operacaoDivisao(){
    if (saidaArray != '' && saidaArray.substr(-2) !== '(-') {
        cmdPonto = '';
        if (ultimaConta.textContent != ''){
            ultimaConta.innerHTML = '';
        }
        let primeirosDoisDigitos = saidaArray.substring(0,2);
        if (primeirosDoisDigitos === '(-'){
            saidaArray += ')'
        }
        entradas.push(saidaArray);
        inputuser = '÷'
        entradas.push(inputuser);
        saidaValores();
        saidaArray = '';
    }
    const ultimaEntrada = entradas[entradas.length - 1];
    if (['+', '-', 'x', '÷'].includes(ultimaEntrada)) {
        entradas = entradas.slice(0, -1);
        inputuser = '÷';
        entradas.push(inputuser);
        consoleResultado.innerHTML = '';
        for (let i = 0; i <= entradas.length - 1; i++){
            consoleResultado.innerHTML += entradas[i];
        }
    }
}

function operacaoMultiplicacao(){
    if (saidaArray != '' && saidaArray.substr(-2) !== '(-') {
        cmdPonto = '';
        if (ultimaConta.textContent != ''){
            ultimaConta.innerHTML = '';
        }
        let primeirosDoisDigitos = saidaArray.substring(0,2);
        if (primeirosDoisDigitos === '(-'){
            saidaArray += ')'
        }
        entradas.push(saidaArray);
        inputuser = 'x'
        entradas.push(inputuser);
        saidaValores();
        saidaArray = '';
    }
    const ultimaEntrada = entradas[entradas.length - 1];
    if (['+', '-', 'x', '÷'].includes(ultimaEntrada)) {
        entradas = entradas.slice(0, -1);
        inputuser = 'x';
        entradas.push(inputuser);
        consoleResultado.innerHTML = '';
        for (let i = 0; i <= entradas.length - 1; i++){
            consoleResultado.innerHTML += entradas[i];
        }
    }
}

function zero(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 0;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function um(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 1;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function dois(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 2;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function tres(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 3;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function quatro(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 4;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function cinco(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 5;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function seis(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 6;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function sete(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 7;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function oito(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 8;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function nove(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    inputuser = 9;
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}

function ponto(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
        consoleResultado.innerHTML = '';
        saidaArray = '';
    }
    if (tamanhoTexto.substring(tamanhoTexto.length-1,tamanhoTexto.length) != "." && cmdPonto == ''){
        inputuser = '.';
        if (tamanhoTexto.length <= 13){
            saidaArray += inputuser;
            saidaValores();
        }
    }

    cmdPonto = 'x';
}
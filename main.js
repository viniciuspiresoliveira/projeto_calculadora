//variáveis globais
const consoleResultado = document.getElementById('resultado');
const ultimaConta = document.getElementById('conta');
let entradas = [];
let saidaArray = '';
let saidaVisor = '';
let inputuser = '';
let tamanhoTexto = '';

//Funções
function resultadoCalculo() {
    if (saidaArray != '') {
        entradas.push(parseFloat(saidaArray));
    }
    //Remove NaN
    for (let i = 0; i <= entradas.length -1; i++) {
        if (isNaN(entradas[i]) == true){
            if (entradas[i] != '+' && entradas[i] != '-' && entradas[i] != '÷' && entradas[i] != 'x'){
                entradas.splice(i,i);
                i = 0;
            }
        }
    }
    //Remove o ultimo valor do array, caso seja um operador
    if (entradas[entradas.length - 1] == '+' || entradas[entradas.length - 1] == '-' || entradas[entradas.length - 1] == 'x' || entradas[entradas.length - 1] == '÷'){
        entradas.pop();
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
    if (x.toString().length > 13) {
        consoleResultado.innerHTML = parseFloat(saidaArray).toFixed(4);
        ultimaConta.innerHTML = `Expressão: ${textoUltimaConta}`;
    } else{
    consoleResultado.innerHTML = saidaArray;
    ultimaConta.innerHTML = `Expressão: ${textoUltimaConta}`;
    }
    let y = saidaArray;
    tamanhoTexto = y.toString();
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
    let resultadoPercentual='';
    if (entradas.length == 0){
        let valorPercentual = saidaArray;
        if (isNaN(valorPercentual) == false){
            let resultadoPercentual = valorPercentual/100;
            entradas.push(resultadoPercentual);
            inputuser = resultadoPercentual;
            saidaArray = inputuser;
            consoleResultado.innerHTML = inputuser;
            entradas.pop();
        }
    } else {
        if (entradas.length > 0){
            let valorPercentual = saidaArray;
            let textConsole = '';
            if (isNaN(valorPercentual) == false){
                if (entradas[entradas.length-2] == '+' || entradas[entradas.length-2] == '-'){
                    resultadoPercentual = (valorPercentual/100)*entradas[entradas.length-2];
                } else {
                    resultadoPercentual = valorPercentual/100;
                }
                entradas.push(resultadoPercentual);
                inputuser = resultadoPercentual;
                saidaArray = inputuser;
                entradas.push(parseFloat(saidaArray));
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
    if (saidaArray != ''){
        let valorConvertido = 0;
        let textConsole = '';
        if (parseFloat(saidaArray) > 0) {
            entradas.push(parseFloat(saidaArray));
            saidaArray = entradas[entradas.length - 1];
            saidaArray = parseFloat(saidaArray * -1);
            entradas.pop();
            entradas.push(parseFloat(saidaArray));
            for (let i = 0; i < entradas.length; i++) {
                textConsole += entradas[i];
            }
            saidaArray=`${entradas[entradas.length - 1]}`;
            entradas.pop();
            consoleResultado.innerHTML = textConsole;
        }
    } else {
        inputuser = '-';
        if (tamanhoTexto.length <= 13){
            saidaArray += inputuser;
            saidaValores();
        }
    }
}

function operacaoSoma(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    if (tamanhoTexto.length < 13){
        entradas.push(parseFloat(saidaArray));
        inputuser = '+'
        entradas.push(inputuser)
        saidaValores();
        saidaArray = '';
    }
}


function operacaoSubtracao(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    if (tamanhoTexto.length < 13){
        entradas.push(parseFloat(saidaArray));
        inputuser = '-'
        entradas.push(inputuser)
        saidaValores();
        saidaArray = '';
    }
}

function operacaoDivisao(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    if (tamanhoTexto.length < 13){
        entradas.push(parseFloat(saidaArray));
        inputuser = '÷'
        entradas.push(inputuser)
        saidaValores();
        saidaArray = '';
    }
}

function operacaoMultiplicacao(){
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    if (tamanhoTexto.length < 13){
        entradas.push(parseFloat(saidaArray));
        inputuser = 'x'
        entradas.push(inputuser)
        saidaValores();
        saidaArray = '';
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
    inputuser = '.';
    if (tamanhoTexto.length <= 13){
        saidaArray += inputuser;
        saidaValores();
    }
}
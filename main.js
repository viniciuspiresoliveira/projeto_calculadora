//variáveis globais
const consoleResultado = document.getElementById('resultado');
const ultimaConta = document.getElementById('conta');
let entradas = [];
let saidaArray = '';
let saidaVisor = '';
let inputuser = '';
let tamanhoTexto = '';
let cmdPonto = '';

//Funções
function removeNAN() {
    for (let i = 0; i <= entradas.length -1; i++) {
        if (isNaN(entradas[i]) == true){
            if (entradas[i] != '+' && entradas[i] != '-' && entradas[i] != '÷' && entradas[i] != 'x'){
                entradas.splice(i,i);
                i = 0;
            }
        }
    }
}

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
    let contRound = 10;
    
    if (x.toString().length > 13) {
        for (let i = 0; i < 10; i++){
            if (x.toString().length > 13) {
                contRound = contRound - 1;
            }
        }
        if (x.toString().length > 13) {
            consoleResultado.innerHTML = "Limite de caracteres"
            ultimaConta.innerHTML = `Expressão: ${textoUltimaConta} = ${parseFloat(saidaArray).toFixed(4)}`;
        } else {
            consoleResultado.innerHTML = parseFloat(saidaArray).toFixed(contRound);
            ultimaConta.innerHTML = `Expressão: ${textoUltimaConta}`;
        }
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
                if (entradas[entradas.length-1] == '+' || entradas[entradas.length-1] == '-'){
                    removeNAN();
                    resultadoPercentual = (valorPercentual/100)*entradas[entradas.length-2];
                } else {
                    removeNAN()
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
            consoleResultado.innerHTML += saidaArray;
        }
    } else {
        inputuser = '-';
        if (tamanhoTexto.length <= 13){
            saidaArray += inputuser;
            saidaValores();
        }
    }
}

function operacaoDuplicada(){
    if (tamanhoTexto.length < 13){
        if (tamanhoTexto.substring(tamanhoTexto.length-1,tamanhoTexto.length) == "x" || 
        tamanhoTexto.substring(tamanhoTexto.length-1,tamanhoTexto.length) == "+" || 
        tamanhoTexto.substring(tamanhoTexto.length-1,tamanhoTexto.length) == "-" || 
        tamanhoTexto.substring(tamanhoTexto.length-1,tamanhoTexto.length) == "÷"){
            entradas.pop();
            tamanhoTexto = tamanhoTexto.substring(0,tamanhoTexto.length-1);
            corrigeOperacao()
        }

        entradas.push(parseFloat(saidaArray));
        entradas.push(inputuser)
        saidaValores();
        saidaArray = '';
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
    cmdPonto = '';
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    inputuser = '+'
    operacaoDuplicada();
}


function operacaoSubtracao(){
    cmdPonto = '';
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    inputuser = '-'
    operacaoDuplicada();
}

function operacaoDivisao(){
    cmdPonto = '';
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    inputuser = '÷'
    operacaoDuplicada();
}

function operacaoMultiplicacao(){
    cmdPonto = '';
    if (ultimaConta.textContent != ''){
        ultimaConta.innerHTML = '';
    }
    inputuser = 'x'
    operacaoDuplicada();
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
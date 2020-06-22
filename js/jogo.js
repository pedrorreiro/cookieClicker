var cookies = 0;
var cps = 0;
var cpc = 1;

itens = [[1, 'Mouse', 15, 0.1, 0],[2,'Cozinheira',200,0.1,0]];


// [id][0: id, 1: nome, 2: preço, 3: frequencia, 4: qtdCompradas]

if(cps != 0){
    var timer = setInterval(cook,1/cps * 1000);
}

// Setters

function setCps(valor){
    cps = parseFloat(valor.toFixed(1));
    atualizaCps();

    if(cps != 0){
        clearInterval(timer);
        var timer = setInterval(cook,1/cps * 1000);
    }

}

function setCpc(valor){
    cpc = parseFloat(valor.toFixed(1));
    atualizaCpc();
}

function setCookies(valor){
    cookies = valor;
    atualizaCookies();
}

// Getters

function getCookies(){
    console.log('Cookies: ' + cookies)
}

function getcpc(){
    console.log('cpc: ' + cpc)
}

function getCps(){
    console.log('Cps: ' + cps)
}

function getAuxCps(){
    console.log('AuxCps: ' + auxCps)
}

// -----------------------------------------------

function menosCps(qtd){

    if(cps != 1 && cps != 0){ // Se chega em 0, da pau

        cps = cps - qtd;
        atualizaCps();
        console.log('Cps: ' + cps);

        clearInterval(timer);
        timer = setInterval(cook,1/cps * 1000);
    }
}

function maisCps(qtd){

    cps = cps + qtd;
    atualizaCps();
    console.log('Cps: ' + cps);

    clearInterval(timer);
    timer = setInterval(cook,1/cps * 1000);
}

function concatenaInventario(idItem){
    item = document.getElementById('inv' + idItem).innerHTML;

    document.getElementById('inv' + idItem).innerHTML = (parseInt(item) + 1).toString();


}

function saveGame(){

    var infoCookies = cookies;
    var infoCps = cps;
    var infoCpc = cpc;

    var qtdCursor = document.getElementById('inv' + 0).innerHTML;
    var qtdCozinheira = document.getElementById('inv' + 1).innerHTML; 

    var lojaPrecoCursor = itens[0][2];
    var lojaPrecoCozinheira = itens[1][2];
    
    var freqCursor = itens[0][3];
    var freqCozinheira = itens[1][3];

    var stringSave = infoCookies + "|" + infoCps + "|" + infoCpc + "|" +
                     qtdCursor + "|" + qtdCozinheira + "|" + lojaPrecoCursor + "|" +
                     lojaPrecoCozinheira + "|" + freqCursor + "|" + freqCozinheira;

    //alert(stringSave);

    setCookie("dados", stringSave, 365)

}

function carregarInfo(){

    dados = getCookie("dados");

    //var dados = window.prompt("Insira os dados do seu save", "x|x|x|x|x|x|x|x|x");

    var infoCookies = [];
    var infoCps = [];
    var infoCpc = [];

    var infoQtdCursor = [];
    var infoQtdCozinheira = [];

    var infoLojaPrecoCursor = [];
    var infoLojaPrecoCozinheira = [];

    var infoFreqCursor = [];
    var infoFreqCozinheira = [];

    dados = dados.split('|');

    infoCookies = parseInt(dados[0]);
    infoCps = parseFloat(dados[1]);
    infoCpc = parseFloat(dados[2]);

    infoQtdCursor = parseInt(dados[3]);
    infoQtdCozinheira = parseInt(dados[4]);

    infoLojaPrecoCursor = parseFloat(dados[5]);
    infoLojaPrecoCozinheira = parseFloat(dados[6]);

    infoFreqCursor = parseFloat(dados[7]);
    infoFreqCozinheira = parseFloat(dados[8]);

    console.log(infoCookies 
                + "|" + infoCps
                + "|" + infoCpc 
                + "|" + infoQtdCursor
                + "|" + infoQtdCozinheira
                + "|" + infoLojaPrecoCursor 
                + "|" + infoLojaPrecoCozinheira
                + "|" + infoFreqCursor
                + "|" + infoFreqCozinheira);

    setCookies(infoCookies);
    setCps(infoCps);
    setCpc(infoCpc);

    itens[0][4] = infoQtdCursor; // qtdCursor inventario

    itens[1][4] = infoQtdCozinheira; // qtdCozinheira inventario

    itens[0][2] = infoLojaPrecoCursor; // preçoCursor

    itens[1][2] = infoLojaPrecoCozinheira; // preçoCozinheira

    itens[0][3] = parseFloat(infoFreqCursor); // freqCursor

    itens[1][3] = parseFloat(infoFreqCozinheira); // freqCozinheira

    atualizaPrecos();

    document.getElementById('inv' + 0).innerHTML = infoQtdCursor;
    document.getElementById('inv' + 1).innerHTML = infoQtdCozinheira;

}

// ----------------------------------------------------

// Funções de update

function atualizaCps(){
    // atualiza cookie por seg

    document.getElementById('cps').innerHTML = parseFloat(cps).toFixed(1);
}

function atualizaCpc(){
    // atualiza cookie por clique
    document.getElementById('cpc').innerHTML = parseFloat(cpc).toFixed(1);

}

function atualizaCookies(){
    document.getElementById('qtdCookies').innerHTML = parseInt(cookies);
}

function atualizaPrecos(){
        // [id][0: id, 1: nome, 2: preço, 3: frequencia, 4: qtdCompradas]

    for(var id = 0 ; id < 2 ; id++){
        document.getElementById(id).innerHTML =  parseFloat(itens[id][2]).toFixed(0).toString();
        
    }
}



function cook(){

    if(cookies == 0){
        atualizaPrecos();
    }

    cookies++;

    setCookies(parseInt(cookies));
    document.getElementById('qtdCookies').innerHTML = cookies;
    //console.log('+' + cps + ' : ' + cookies)

    atualizaCps();
}

function cookClick(){

    if(cookies == 0){
        atualizaPrecos();
    }

    setCookies(parseInt(cookies + cpc));
    document.getElementById('qtdCookies').innerHTML = cookies;
    //console.log('+' + cps + ' : ' + cookies)

    atualizaCps();
}

function cobra(id){

    id = parseInt(id); // id do item

    var freq = itens[id][3];
    var nome = itens[id][1];
    var preco = itens[id][2];

    // [id][0: id, 1: nome, 2: preço, 3: frequencia, 4: qtdCompradas]

    console.log('ID: ' + id + ' Nome: ' + nome + ' Preço: ' + preco);

    if(cookies >= parseInt(preco)){
        setCookies(cookies-parseInt(preco));

        if(id == 0){
            
            // item do click aumenta preço em 25% do preço antigo

            itens[id][2] += (itens[id][2] * 0.25);

            itens[id][3] += 0.1;   // item do click aumenta cpc em 0.1
        
        }

        else if(id == 1){
            
            // item do click aumenta preço em 25% do preço antigo
            
            itens[id][2] += (itens[id][2] * 0.25);
            
            itens[id][3] += 0.1; // item da cozinheira aumenta cps em 0.1
        }

        switch(id){
            case 0: // aumenta o click por click
                cpc+= parseFloat(freq);
                atualizaCpc();
                itens[id][4]++;
                concatenaInventario(0);

                break;
            
            case 1: // aumenta cookie por segundo
                cpc+= parseFloat(freq);
                maisCps(freq);
                atualizaCps();
                itens[id][4]++;
                concatenaInventario(1);
                break
        }
        
        console.log('Compra com sucesso!');

        atualizaPrecos();

    }

    else{
        console.log('Saldo insuficiente!');
    }
}

// COOKIES FUNCTIONS

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function salvaCookieNome() {
    var nome = getCookie("nome");
    if (nome != "") {
    } else {
        nome = prompt("Não encontramos seu registro, insira o seu nome:", "");
        if (nome != "" && nome != null) {
            setCookie("nome", nome, 365);
        }
    }
}

function salvaCookieTempo() {
    var tempo = getCookie("tempo");
    if (tempo == "") {
        setCookie("tempo",timeGame,365);
    }
    
    else if (tempo != "" && tempo != null) {
            setCookie("tempo", timeGame, 365);
        }
}

function salvaCookiePontos() {
    var cookPontos = getCookie("pontos");
    if (cookPontos == "") {
        setCookie("pontos",pontos,365);
        console.log('Nao havia nenhuma pontuação registrada. Agora sim!')
    } 
    
    else if(pontos > parseInt(getCookie("pontos"))) {
        setCookie('pontos',pontos,365);
        console.log('Vc ultapassou a pontuação anterior!')
    }
}
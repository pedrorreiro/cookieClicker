style = "color:blue;font-size:1.1em;font-weight:bold";
style2 = "color:red; font-weight:bold;font-size:1.4em;";
styleBold = "font-weight:bold";
   
   console.info("%cNão trapaceie, senão perde todo o conceito de diversão do game", style2);
   console.info("%cTodos os direitos reservados © 2020 - Pedro H.",style);
   console.info("");

var cookies = 0;
var allCookies = 0;
var qtdCliques = 0;
var cps = 0;
var cpc = 1;

var timer;

if(cps != 0){
    timer = setInterval(cook,1/cps * 1000);
}

// Dados Loja

// Cursor

class Cursor{

    id = 1;
    nome = "Mouse";
    price = 15;
    freq = 0.1;
    qtdCompradas = 0;

}

// Cursor

class Cozinheira{

    id = 1;
    nome = "Cozinheira";
    price = 200;
    freq = 0.1;
    qtdCompradas = 0;

}

curs = new Cursor();
coz = new Cozinheira();

itens = [curs,coz];

function zeraSave() {

    setCookies(0);

    setCpc(1);
    setCps(0);

    stringSave = getStringSave();

    curs = new Cursor();
    coz = new Cozinheira();

    itens = [curs,coz]; // atualizando lista de itens

    atualizaprices();

    allCookies = 0;
    document.getElementById('totalCookies').innerHTML = allCookies;
    document.getElementById('qtdCliques').innerHTML = qtdCliques;

    qtdCliques = 0;

    zeraInventario();
        
    setCookie("dados", stringSave, 365); // atualiza cookies zerados
}

// Setters

function setCps(valor){
    cps = parseFloat(valor.toFixed(1));
    atualizaCps();

    if(cps != 0){
        clearInterval(timer);
        timer = setInterval(cook,1/cps * 1000);
    }

    if(cps == 0){
        clearInterval(timer);
    }

}

function setCpc(valor){
    cpc = parseFloat(valor.toFixed(1));
    atualizaCpc();
}

function setCookies(valor){
    cookies = parseInt(valor);
    atualizaCookies();
}

// Getters

function getCookies(){
    //console.log('Cookies: ' + cookies)
}

function getcpc(){
    //console.log('cpc: ' + cpc)
}

function getCps(){
    //console.log('Cps: ' + cps)
}

function getAuxCps(){
    //console.log('AuxCps: ' + auxCps)
}

function maisCps(qtd){

    cps = cps + qtd;
    atualizaCps();
    //console.log('Cps: ' + cps);

    clearInterval(timer);
    timer = setInterval(cook,1/cps * 1000);
}

function concatenaInventario(idItem){
    item = document.getElementById('inv' + idItem).innerHTML;

    itens[idItem].qtdCompradas++; // concatena vendidos na loja

    document.getElementById('inv' + idItem).innerHTML = (parseInt(item) + 1).toString();  // concatena no HTML
}

function zeraInventario(){

    for(var i = 0 ; i < itens.length ; i++){
        
        item = document.getElementById('inv' + i).innerHTML;

        itens[i].qtdCompradas = 0; // concatena vendidos na loja
    
        document.getElementById('inv' + i).innerHTML = "0";  // zera no HTML

    }

}

function getStringSave(){

    var infoCookies = cookies;
    var infoCps = cps;
    var infoCpc = cpc;
    var infoAllCookies = allCookies;
    var infoQtdCliques = qtdCliques;

    var qtdCursor = itens[0].qtdCompradas;
    var qtdCozinheira = itens[1].qtdCompradas;

    var lojapriceCursor = itens[0].price;
    var lojapriceCozinheira = itens[1].price;
    
    var freqCursor = itens[0].freq;
    var freqCozinheira = itens[1].freq;

    return (infoCookies + "|" + infoCps + "|" + infoCpc + "|" + infoAllCookies + "|" + infoQtdCliques + "|" +
                     qtdCursor + "|" + qtdCozinheira + "|" + lojapriceCursor + "|" +
                     lojapriceCozinheira + "|" + freqCursor + "|" + freqCozinheira);
}

function autoSave(){
    carregarInfo();
    setInterval(saveGame,5000);
    
}

function saveGame(){

    var data = new Date();

    stringSave = getStringSave();

    //alert(stringSave);

    setCookie("dados", stringSave, 365)

    dataSave = data.getHours() + ":" +  data.getMinutes() + ":" + data.getSeconds();

    document.getElementById('dataSave').innerHTML = dataSave;

}

function carregarInfo(){

    if(checkCookie("dados")) dados = getCookie("dados");


    else dados = getStringSave();

    var infoCookies;
    var infoCps;
    var infoCpc;
    var infoAllCookies;
    var infoQtdCliques;

    var infoQtdCursor;
    var infoQtdCozinheira;

    var infoLojapriceCursor;
    var infoLojapriceCozinheira;

    var infoFreqCursor;
    var infoFreqCozinheira;

    dados = dados.split('|');

    infoCookies = parseInt(dados[0]);
    infoCps = parseFloat(dados[1]);
    infoCpc = parseFloat(dados[2]);
    infoAllCookies = parseInt(dados[3]);
    infoQtdCliques = parseInt(dados[4]);

    infoQtdCursor = parseInt(dados[5]);
    infoQtdCozinheira = parseInt(dados[6]);

    infoLojapriceCursor = parseFloat(dados[7]);
    infoLojapriceCozinheira = parseFloat(dados[8]);

    infoFreqCursor = parseFloat(dados[9]);
    infoFreqCozinheira = parseFloat(dados[10]);

    console.info("%cGame carregado! Código do save atual: " + infoCookies 
                + "|" + infoCps
                + "|" + infoCpc
                + "|" + infoAllCookies
                + "|" + infoQtdCliques
                + "|" + infoQtdCursor
                + "|" + infoQtdCozinheira
                + "|" + infoLojapriceCursor 
                + "|" + infoLojapriceCozinheira
                + "|" + infoFreqCursor
                + "|" + infoFreqCozinheira, styleBold);
    console.info("");

    setCookies(infoCookies);
    setCps(infoCps);
    setCpc(infoCpc);

    itens[0].qtdCompradas = infoQtdCursor; // qtdCursor inventario

    itens[1].qtdCompradas = infoQtdCozinheira; // qtdCozinheira inventario

    itens[0].price = infoLojapriceCursor; // preçoCursor

    itens[1].price = infoLojapriceCozinheira; // preçoCozinheira

    itens[0].freq = parseFloat(infoFreqCursor); // freqCursor

    itens[1].freq = parseFloat(infoFreqCozinheira); // freqCozinheira

    allCookies = infoAllCookies;
    qtdCliques = infoQtdCliques;

    atualizaprices();

    atualizaCookies();

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

    var auxCpc = parseFloat(cpc);

    if(cpc >= 1000000 && cpc < 1000000000){
        document.getElementById('unidCpc').innerHTML = ' million';
        document.getElementById('cpc').innerHTML = parseFloat(auxCpc/1000000).toFixed(2);
    }

    else if(cpc >= 1000000000 && cpc < 1000000000000){
        document.getElementById('unidCpc').innerHTML = ' billion';
        document.getElementById('cpc').innerHTML = parseFloat(auxCpc/1000000000).toFixed(2);
    }

    else if(cpc >= 1000000000000 && cpc < 1000000000000000){
        document.getElementById('unidCpc').innerHTML = ' trillion';
        document.getElementById('cpc').innerHTML = parseFloat(auxCpc/1000000000000).toFixed(2);
    }

    else{
        document.getElementById('unidCpc').innerHTML = '';
        document.getElementById('cpc').innerHTML = cpc.toFixed(2);
    } 

    

}

function atualizaCookies(){

    var auxCookies = parseFloat(cookies);

    if(cookies >= 1000000 && cookies < 1000000000){
        document.getElementById('unid').innerHTML = ' million';
        document.getElementById('qtdCookies').innerHTML = parseFloat(auxCookies/1000000).toFixed(2);
    }

    else if(cookies >= 1000000000 && cookies < 1000000000000){
        document.getElementById('unid').innerHTML = ' billion';
        document.getElementById('qtdCookies').innerHTML = parseFloat(auxCookies/1000000000).toFixed(2);
    }

    else if(cookies >= 1000000000000 && cookies < 1000000000000000){
        document.getElementById('unid').innerHTML = ' trillion';
        document.getElementById('qtdCookies').innerHTML = parseFloat(auxCookies/1000000000000).toFixed(2);
    }

    else{
        document.getElementById('qtdCookies').innerHTML = cookies;
        document.getElementById('unid').innerHTML = '';
    }
    
    document.getElementById('totalCookies').innerHTML = allCookies;

    document.getElementById('qtdCliques').innerHTML = qtdCliques;
}

function atualizaprices(){

    var auxPrice;

    for(var id = 0 ; id < 2 ; id++){

        auxPrice = parseFloat(itens[id].price);

        if(auxPrice >= 1000000 && auxPrice < 1000000000){
            document.getElementById('unidPrice').innerHTML = ' million';
            document.getElementById(id).innerHTML =  parseInt(itens[id].price/1000000);
        }

        else if(auxPrice >= 1000000000 && auxPrice < 1000000000000){
            document.getElementById('unidPrice').innerHTML = ' billion';
            document.getElementById(id).innerHTML =  parseInt(itens[id].price/1000000000);
        }

        else if(auxPrice >= 1000000000000 && auxPrice < 1000000000000000){
            document.getElementById('unidPrice').innerHTML = ' trillion';
            document.getElementById(id).innerHTML =  parseInt(itens[id].price/1000000000000);
        }

        else{
            document.getElementById(id).innerHTML =  parseInt(itens[id].price);
            document.getElementById('unid').innerHTML = '';
        } 

    }
}

function cook(){

    if(cookies == 0){
        atualizaprices();
    }

    cookies++;
    allCookies++;

    setCookies(parseInt(cookies));

    atualizaCps();

    verificaDinheiro();
}

function cookClick(){

    if(cookies == 0){
        atualizaprices();
    }
    
    allCookies+= parseInt(cpc);

    qtdCliques++;


    setCookies(parseInt(cookies + cpc));

    atualizaCps();

    verificaDinheiro();

}

function verificaDinheiro(){ // verifica se pode comprar os itens

    qtdItens = itens.length;

    for(var i = 0 ; i < qtdItens ; i++){
        if(cookies >= itens[i].price){ 
            document.getElementsByClassName('itemLoja')[i].style.background =  "rgba(124, 252, 0, 0.8)"; // green
        }

        else if((cookies < itens[i].price)){   
            document.getElementsByClassName('itemLoja')[i].style.background =  "rgba(255, 0, 0, 0.8)"; // red
        }
    }
    
        if(itens[1].qtdCompradas == 20){ // limitando cozinheira por causa do bug
        document.getElementById('avisoBug').style.display = "block";
        document.getElementsByClassName('itemLoja')[1].style.background =  "rgba(255, 133, 20, 0.8)"; // laranja
    }
}

function compra(id){

    id = parseInt(id); // id do item

    // itens[0] cursor, itens[1] cozinheira

    var freq = itens[id].freq;
    var nome = itens[id].nome;
    var price = itens[id].price;

    if(id == 0){

        
        if(cookies >= parseFloat(price)){ // se tiver dinheiro
            
            setCookies(cookies-parseFloat(price));
                
            // item do click aumenta preço em 20% do preço antigo

            itens[id].price += parseInt(itens[id].price * 0.2);

            itens[id].freq += itens[id].freq * 0.2 ; // item do cursor aumenta cps em 20% 
                                                    // do cps anterior do item

            concatenaInventario(0); // aumenta no inventario

            // aumenta o cookie por click
                
            cpc+= parseFloat(freq);

            atualizaCpc();

            document.getElementsByClassName('itemLoja')[0].style.border =  ""; // tira a borda vermelha

            atualizaprices();

            verificaDinheiro();
       
        }

        else{ // se nao tiver dinheiro
            
            document.getElementsByClassName('itemLoja')[0].style.background =  "rgba(255, 0, 0, 0.8)";


        }
    }
        
    else if(id == 1){

        if(cookies >= parseInt(price)){ // se tiver dinheiro

            if(itens[1].qtdCompradas == 20){ // limitando cozinheira por causa do bug
                document.getElementById('avisoBug').style.display = "block";
                document.getElementsByClassName('itemLoja')[1].style.background =  "rgba(255, 133, 20, 0.8)";
            }

            else{ // se tiver menos que 20
            
                setCookies(cookies-parseFloat(price));
                
                // item do click aumenta preço em 15% do preço antigo
                    
                itens[id].price += parseInt(itens[id].price * 0.15);
                    
                itens[id].freq += itens[id].freq * 0.8 ; // item da cozinheira aumenta cps em 40% 
                                                        // do cps anterior do item

                concatenaInventario(1); // aumenta no inventario

                // aumenta cookie por segundo

                maisCps(freq);
                atualizaCps();

                document.getElementsByClassName('itemLoja')[1].style.border =  ""; // tira a borda vermelha

                atualizaprices();

                verificaDinheiro();
            }   
       
        }

        else{ // se nao tiver dinheiro
            
            document.getElementsByClassName('itemLoja')[1].style.background =  "rgba(255, 0, 0, 0.8)";
        }

        document.getElementsByClassName('itemLoja');
       
    }

    atualizaCookies();
    atualizaCps();

}

function escondeInv(){

    if(document.getElementById('itensInv').style.display == "inline-block" 
        || document.getElementById('itensInv').style.display == ""){

        document.getElementById('itensInv').style.display = "none";
        document.getElementById('hideButton').innerHTML = "  -  (MOSTRAR)";

    }

    else{
        document.getElementById('itensInv').style.display = "inline-block";
        document.getElementById('hideButton').innerHTML = "  -  (ESCONDER)";
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

function checkCookie(cname) {
    var user = getCookie(cname);

    if (user == "") {
        return false
    } else return true;
}
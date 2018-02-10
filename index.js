let $ = require('jquery');

const electron = require('electron');
const {ipcRenderer} = electron;

var coinList = [];

getCoinList();

function getCoinList() {
    let result = httpGet("https://api.coinmarketcap.com/v1/ticker/?limit=100");
    
    let obj = JSON.parse(result);
    //console.log(obj);

    if (obj != null) {
        $('#loadingPage').hide();
    }

    $.each(obj, function(k ,v){
        coinList.push(v.Name);
        $("#coinList").append('<li class="coinmarketcap-currency-widget" data-currency="' + v.id + '" data-base="USD"></li>');
    });
}


function coin_search(currency_name) {

    //let result = httpGet("https://api.coinmarketcap.com/v1/ticker/" + currency_name + "/");
    //let obj = JSON.parse(result);
    //console.log(obj[0].id);

    // Open new window with results
    ipcRenderer.send('coin_search', currency_name);

}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

$('#searchBtn').on('click', () => {
    let currency_name = $('#item').val();
    coin_search(currency_name);
}) 



let $ = require('jquery');

const electron = require('electron');
const {ipcRenderer} = electron;

ipcRenderer.on('info', (event, message) => {
    document.title = message.toUpperCase();
    $("#coin").find('li').remove();
    $("#coin").append('<li class="coinmarketcap-currency-widget" data-currency="' + message + '" data-base="USD"></li>');
});

$('#backBtn').on('click', () => {
    ipcRenderer.send('back', "");
});
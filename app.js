/* var express = require('express');
var fs = require('fs');
var app     = express();
const fetch = require('node-fetch');

const { URLSearchParams } = require('url');

const params = new URLSearchParams();
params.append('a', 1);



app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app
.get('/', function (request, response) {
    var date = new Date();
    var current = date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds()
    
    console.log(current);
    response.send(`IT works on ${current}`);
})


.listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
*/
// 13-14
// 14-15
// 15-16
// 16-17
// 17-18
// 18-19
// 19-20
// 20-21
// 21-22
// 22-23
// 23-24

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// =====================================================
// =====================================================
// =====================================================
// GOOGLE SHEETS
const GoogleSheet = require("./google_sheets_lib.js");
// const table = new GoogleSheet('spreadsheetId')  
// =====================================================
// =====================================================
// =====================================================



// =====================================================
// =====================================================
// TELEGRAM BOT
const TelegramApi = require('node-telegram-bot-api')
const token = '1875944742:AAFJcpFSki3xGrctlJBLJa7pT92z46Fm56k'
// =====================================================
// =====================================================

try {
    const bot = new TelegramApi(token, {polling: true})

    const start = async () => {


        bot.on('message', async message => {
            const msg = message.text,
            chatId = message.chat.id,
            chatType = message.chat.type,
            username = message.from.username;
        }); // <- bot on message


        bot.on('photo', async msg => {


        }); // <- bot on phone
        
        
        
        
        bot.on('location', async msg => {


        }); // <- bot on location
        
        
        
        bot.on('new_chat_members', async msg => {


        }); // <- bot on new_chat_members
        
        
        bot.on('callback_query', async msg => {
            const data = msg.data;
            const chatId = msg.message.chat.id;


        }); // <- bot on callback_query

    } // <- start = async ()
    start()


} catch (error) {
    console.log(error);
}

function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function infinite() {
    while (true) {
        var sleep = 5;
        await timeout(sleep*60*1000)
        fetch(
            'https://stormy-falls-15822.herokuapp.com/',
            { method: 'GET' }
            )
        .then(async res => console.log(await res.text()))
            // .then(json => console.log(json));
        }
    } // <- async function infinite()
    
    // infinite()
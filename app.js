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
/* 15-16
16-17
17-18
18-19
19-20
20-21
21-22
22-23
23-24 */
// 
var moment = require('moment-timezone'); // require
moment().format(); 
moment.tz.setDefault("Europe/Moscow");

var now = moment();
console.log(now);
// moment.lang('ru');
moment.locale('ru');
console.log(now.format('dddd, MMMM DD YYYY, h:mm:ss'));
// вторник, ноябрь 15 2011, 3:31:03

// $ git push remote 0cb283e7bc611ea5be19fe93fef42a0067152475:refs/heads/https://github.com/wd21th/google_sheet_lib.git
var halloween = moment([2011, 9, 31]); // October 31st
// moment.lang('ru');
console.log(halloween.fromNow());
/* 

var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
var losAngeles = newYork.clone().tz("America/Los_Angeles");
var london     = newYork.clone().tz("Europe/London");

newYork.format();    // 2014-06-01T12:00:00-04:00
losAngeles.format(); // 2014-06-01T09:00:00-07:00
london.format();     // 2014-06-01T17:00:00+01:00

*/



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/* 

Как отобразить все методы объекта?

https://fooobar.com/questions/35807/how-to-display-all-methods-of-an-object

console.log(Object.getOwnPropertyNames(Math));
//-> ["E", "LN10", "LN2", "LOG2E", "LOG10E", "PI", ...etc ]
Затем вы можете использовать filter(), чтобы получить только методы:

console.log(Object.getOwnPropertyNames(Math).filter(function (p) {
    return typeof Math[p] === 'function';
}));
//-> ["random", "abs", "acos", "asin", "atan", "ceil", "cos", "exp", ...etc ]










*/









// =====================================================
// =====================================================
// =====================================================
// GOOGLE SHEETS
const GoogleSheet = require("./myLibs/google_sheet_lib/google_sheets_lib.js");
let sheetUrl = 'https://docs.google.com/spreadsheets/d/1koDE7nmngtJouFoOapBhpoELxnXf2gE8bfUTE8aCRHE/edit#gid=0'
let banyaId = sheetUrl.match(/(?<=d\/)(.+)(?=\/edit)/)[0]
// console.log(banyaId);
// const table = new GoogleSheet('spreadsheetId')  
const banya = new GoogleSheet(banyaId);
(async () => {
    // console.log(await banya.getSheetNames());
    // banya.test2()
    // await banya.create('smt')
    //  await 
    
})();
// =====================================================
// =====================================================
// =====================================================



// =====================================================
// =====================================================
// TELEGRAM BOT
const TelegramApi = require('node-telegram-bot-api')
const token = '1820745191:AAHy17qRODCQPZXXEmkueA5AEh19Bku0i5o'
// =====================================================
// =====================================================

try {
    const bot = new TelegramApi(token, {polling: true})
    
    const start = async () => {
        /* console.log(await banya.getRowsWhere('Понедельник', 'status', 'не занят'));
        */
        
        
        bot.onText(/Заказать баню/, async message =>  {
            
// await bot.sendMessage(chatId, ` Привет мир`);
            let times = await banya.getRowsWhere('Понедельник', 'status', 'не занят').
            then(async function(res) {
                return await res.filter(function (item) {
                    return item.status == 'не занят';
                });
            })
            console.log(times);

            
            /* arr.filter(function (item) {
                return item.status == 'не занят';
            });
            console.log(smt);
            */
        })
        
        
        
        // SECTION <- bot on message
        bot.on('message', async message => {
            const msg = message.text,
            chatId = message.chat.id,
            chatType = message.chat.type,
            username = message.from.username;
            await bot.sendMessage(chatId, ` Привет мир`);
            
            let times = await banya.getRowsWhere('Понедельник', 'status', 'не занят').
                then(async function (res) {
                    return await res.filter(function (item) {
                        return item.status == 'не занят';
                    });
                })
            console.log(times);

            
        }); // bot on message ->
        // !SECTION
        
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
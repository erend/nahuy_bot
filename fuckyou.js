
var TelegramBot = require('node-telegram-bot-api');
var token = '144626366:AAEkIelj-IucVD8OUBuM-qwcHb7xZ2LzwkE';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var messageText = msg.text;
    console.log(msg);
    var fuckYou = function (msg) {
        if (!msg.from.username) {
            return msg.from.first_name;
        } else {
           return msg.from.username;
        };
    };
    bot.sendMessage(chatId, 'Иди нахуй, ' + fuckYou(msg) + '!');
});

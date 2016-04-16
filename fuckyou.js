var fs = require('fs');
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
    if (messageText === "сколько послано?" || messageText === "Сколько послано?") {
        readNumber(chatId, function(chatid, data) {bot.sendMessage(chatid, "Послано: " + data)});
    } else {
        bot.sendMessage(chatId, 'Иди нахуй, ' + fuckYou(msg) + '!');
        saveNumber(msg.from);
    };
});

var saveNumber = function (user) {
    var obj;
    fs.readFile('./fucked.log', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        obj = JSON.parse(data);

        if (obj[user.id]) {
            obj[user.id].fucked++;
        } else {
            obj[user.id] = {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                fucked: 1
            }
        };

        fs.writeFile("./fucked.log", JSON.stringify(obj), function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    });
    
}

var readNumber = function (chatid, callback) {
    fs.readFile('./fucked.log', 'utf8', function (err,data) {
        if (err) return console.log(err);

        obj = JSON.parse(data);        

        return callback(chatid, Object.keys(obj).length);
    });
} 


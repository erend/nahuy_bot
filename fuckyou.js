var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var bot_token = require('./token.js');
var bot = new TelegramBot(bot_token.token, {polling: true});

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
    if (messageText.toUpperCase() === "СКОЛЬКО ПОСЛАНО?" || messageText.toUpperCase() === "СКОЛЬКО ПОСЛАЛ?") {
        readData(chatId, function(chatid, data) {bot.sendMessage(chatid, "Послано: " + Object.keys(data).length)});
    } else if (messageText.toUpperCase() === "КОГО ПОСЛАЛ?"){
        readData(chatId, function(chatid, data) {
            for (key in data) {

                var fucked_man = {};
                fucked_man.fucked = data[key].fucked;

                if (!data[key].username) {
                    fucked_man.name = data[key].first_name;
                } else {
                    fucked_man.name = data[key].username;
                };
		
     		var full = String(data[key].fucked);		
		var last = +full.charAt(full.length - 1);

                if ((last === 2 && full != 12) || (last === 3 && full != 13) || (last === 4 && full != 14)) {
                    bot.sendMessage(chatid, fucked_man.name + " послан: " + fucked_man.fucked + " раза.");
                } else {
                    bot.sendMessage(chatid, fucked_man.name + " послан: " + fucked_man.fucked + " раз.");
                };                
            };     
        });
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

var readData = function (chatid, callback) {
    fs.readFile('./fucked.log', 'utf8', function (err,data) {
        if (err) return console.log(err);

        obj = JSON.parse(data);        

        return callback(chatid, obj);
    });
} 


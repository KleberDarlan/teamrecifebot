var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '0c7826e9-5a4f-49f7-b834-de6adfd8108c',
    appPassword: 'Vrbaefy5aqOapbz9xGVf1HH'
});
var bot = new builder.UniversalBot(connector);

var model = 'https://api.projectoxford.ai/luis/v2.0/apps/04f41dbe-42b1-4791-a181-fb919520dfaf?subscription-key=fb670f8f02b941b2ae7a9d7777b49223';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

dialog.matches('Saudações', [
    function (session, args, next) {
        session.send("Oi.");
    },
    function (session, results) {
        console.log("resposta SIM")
    }
]);

dialog.onDefault(builder.DialogAction.send("Desculpe, não entendi. Você pode tentar falar com outras palavras?"));

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

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var model = 'https://api.projectoxford.ai/luis/v2.0/apps/c5459c20-6962-4768-ad07-892a270f52b1?subscription-key=fb670f8f02b941b2ae7a9d7777b49223';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

dialog.matches('o_que_e_mei', [
    function (session, args, next) {
        session.send("Microempreendedor Individual (MEI) é a pessoa que trabalha por conta própria e que se legaliza como pequeno empresário."+
            "Para ser um microempreendedor individual, é necessário faturar no máximo até R$ 60.000,00 por ano e não ter  participação em outra"+
            " empresa como sócio ou titular.");
    },
    function (session, results) {
        console.log("resposta SIM")
    }
]);

dialog.onDefault(builder.DialogAction.send("Desculpe, não entendi. Você pode tentar falar com outras palavras?"));

var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require("fs");
// var firebase = require('firebase');
// firebase.initializeApp({
//     databaseURL: 'https://*****.firebaseio.com',
//     serviceAccount: 'myapp-13ad200fc320.json', //this is file that I downloaded from Firebase Console
// });


// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('chat.db');
app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.sendfile('index.html');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

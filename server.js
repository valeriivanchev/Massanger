var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 1313;
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://valeri:dodo2110@trial.xqsc2.mongodb.net/Massanger?retryWrites=true&w=majority";
var io = require('socket.io')(server);
var SendMassage = require('./private/NewMassage.js');
var ReceiveMassage = require('./private/ReceiveMassage.js');
var Account = require('./private/CreateAccount.js');
var FindAllAcounts = require("./private/AllAccounts.js");
server.listen(port,function(){
    console.log("Port %d",port);
});

app.use('/static',express.static('./public'));

app.get('/',function(req,res){
    res.sendfile(__dirname+"/public/html/register.html");
});
io.on('connection',function(socket){
    socket.on('CreateRoom',function(roomnumber){
        socket.join("Room"+roomnumber);
      
    })
    socket.on('Massage',function(massage){    
    
        MongoClient.connect(url,function(err,client){
                var db = client.db("Massanger");
                assert.equal(null,err);
               // console.log("Connected");
                SendMassage.SendMassage(db,massage.text,massage.Fromuser,massage.Touser,massage.roomNumber,function(){
                    client.close();
                   
                    
                });
                ReceiveMassage.ReceiveMassage(db,massage.roomNumber,function(docs){
                     io.sockets.to("Room"+massage.roomNumber).emit('Massages',docs);
                    client.close();
                  });
            });
    });

    socket.on('Receive',function(rMassage){
      
        MongoClient.connect(url,function(err,client){
            var db = client.db("Massanger");
            assert.equal(null,err);
           
            console.log("Connected");
    console.log(rMassage);
         ReceiveMassage.ReceiveMassage(db,rMassage.room,function(docs){
           io.sockets.to("Room"+rMassage.room).emit('Massages',docs);
            client.close();
          });
        });
    });
    


        socket.on('Account',function(username){

            MongoClient.connect(url,function(err,client){
            var db = client.db('Massanger');
            assert.equal(err,null);
            console.log("Connected");
            Account.FindExistingAccount(db,username,function(docs){
               
                if(docs.length <= 0){
                Account.MakeAccount(db,username,function(){
                    client.close();
                 
                });
                }
                io.emit('Info',docs.length);
                
                client.close();
            });
            
            });
        });

        socket.on("FAllAccounts",function(username){
            MongoClient.connect(url,function(err,client){
                var db = client.db("Massanger");
                assert.equal(null,err);
                console.log("Connected");
                FindAllAcounts.AllAccounts(db,function(docs){
                  io.emit('AllAccounts',docs);
                  client.close();
                });
              });
        });
        
});
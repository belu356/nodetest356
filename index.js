
var express = require('express');
//var redis = require('redis');
var app = express();
const https = require('https');
var cors = require('cors')
app.use(cors());
var redis = require('redis');


client = redis.createClient(); //creates a new client


client.on('connect', function() {
    console.log('Redis Server');
});

//client.rpush(['names', 'Dutch', 'Arthur', 'Bill', 'Micah'], function(err, reply){
    //console.log(reply)
//})
client.lrange('names', 0, -1, function(err, reply){
    console.log(reply)
    app.get('/names', function(req, res) {
        res.send(reply);
      });
})
 //client.rpush(['phones', '234234', '424234', '234234', '234234'], function(err, reply){
 //})
    client.lrange('phones', 0, -1, function(err, reply){
        console.log(reply)
        app.get('/phones', function(req, res) {
            res.send(reply);
          }); 
        })

        
        //var name = 'Woss'
        //var phone = '123123'
     //   client.lpush('names', name)
     
    //  var request = require('request'); 

    /*  app.post('/post', function(req, res) {
        res.send('recibido')
        console.log(res)  
      })
      app.get('/post', function(req, res){
        res.send(res)
      })
      */  

        
app.listen(3000, function() {
    console.log('API inicializada');
});
// test
/*app.get('/hashCount', function(req, res) {
    res.send('https://jsonplaceholder.typicode.com/users');
});*/



https.get('https://jsonplaceholder.typicode.com/users', (response) => {
  let todo = '';

  // called when a data chunk is received.
  response.on('data', (chunk) => {
    todo += chunk;
  });

  // called when the complete response is received.
  response.on('end', () => {
    app.get('/', function(req, res) {
        res.send(todo);
      });
  });


}).on("error", (error) => {
  console.log("Error: " + error.message);
});
/*redisClient.set(["key1", "val1","val2","val3","val4"]);

redisClient.lrange(key, 0, -1, function(err, values) {
    console.log(values)
});*/
 
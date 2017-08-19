/**
 * Created by lalafa on 16.06.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;
var db = require('./db');
var artists = require('./artists');
//var sleep = require('sleep');
var app = express();
//app.use(express.static('/app'));
//var db;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('.'));

artists.init(app);
// var artists = [
//     {id: 1, name: 'Queen'},
//     {id: 2, name: 'Pind Floyd'},
//     {id: 3, name: 'Rammstein'}
// ];

app.get('/$', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    //res.send('Hello API');
})

app.get('/resolve$', function (req, res) {
    res.sendFile(__dirname + '/app/resolve.html');
    //res.send('Hello API');
})


app.get('/artists2', function (req, res) {
    const query = {
      text: 'select id, name from artists'    
    };
    db.get().query(query, (err, result) => {
      if (err) {
        return res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    })
})


/*
*******FOR MUSIC****
app.get('/music', function (req, res) {
    //sleep.sleep(5);
    db.get().collection('music').find().toArray(function (err, docs) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/music/:id', function (req, res) {
    db.get().collection('music').findOne({_id: ObjectId(req.params.id)}, function (err, doc) {
        if (err){
            console.log(err);
            return req.sendStatus(500);
        }
        res.send(doc);
    })
})

app.post('/music', function (req, res) {
    var music = [{
        name: req.body.name,
        album: req.body.album
    }];
    db.get().collection('music').insert(music, function (err, result) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(music);
    })
})

app.put('/music/:id', function (req, res) {
    db.get().collection('music').updateOne({_id: ObjectId(req.params.id)}, {name:req.body.name}, function (err, result) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
})

app.delete('/music/:id', function (req, res) {
    db.get().collection('music').deleteOne({_id: ObjectId(req.params.id)}, function (err, result) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
})
*/
//192.168.1.66 remote ip
//localhost    local
db.connect("postgres://postgres:postgres@localhost:5432/postgres", function (err) {
    if (err){
        return console.log(err);
    }
    //db = database;
    app.listen(3012, function () {
        console.log('API app started at localhost:3012');
    })

})


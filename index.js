/**
 * Created by lalafa on 16.06.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
    {id: 1, name: 'Queen'},
    {id: 2, name: 'Pind Floyd'},
    {id: 3, name: 'Rammstein'}
];

app.get('/', function (req, res) {
    res.send('Hello API');
})

app.get('/artists', function (req, res) {
    //res.send(artists);
    db.collection('artists').find().toArray(function (err, docs) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/artists/:id', function (req, res) {
    db.collection('artists').findOne({_id: ObjectId(req.params.id)}, function (err, doc) {
        if (err){
            console.log(err);
            return req.sendStatus(500);
        }
        res.send(doc);
    })
    /*var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });*/
    //res.send(artist);
})

app.post('/artists', function (req, res) {
    var artist = {
        name: req.body.name
    }
    db.collection('artists').insert(artist, function (err, result) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
    /*
    if (artists.push(artist)) {
        res.send(artist);
    }*/
})

app.put('/artists/:id', function (req, res) {
    db.collection('artists').update({_id: ObjectId(req.params.id)}, {name:req.body.name});
    res.sendStatus(200);
    /*
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    artist.name = req.body.name;
    res.sendStatus(200);*/
})

app.delete('/artists/:id', function (req, res) {
    //artists.remove();
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    var index = artists.indexOf(artist);
    artists.splice(index, 1);
    console.log('/*-------------');
    console.log(artist);
    console.log('удален');
    console.log('-------------*/');
    res.sendStatus(200);
})

/*app.listen(3012, function () {
    console.log('API app started');
})*/

//192.168.1.66 remote ip
//localhost    local
MongoClient.connect('mongodb://localhost:27017/mongo', function (err, database) {
    if (err){
        return console.log(err);
    }
    db = database;
    app.listen(3012, function () {
        console.log('API app started');
    })
})
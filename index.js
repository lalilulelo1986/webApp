/**
 * Created by lalafa on 16.06.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

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
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
})

app.post('/artists', function (req, res) {
    var artist = {
        //id: Date.now(),
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
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    console.log('/*-------------');
    console.log(artist);
    artist.name = req.body.name;
    console.log('обновлен на');
    console.log(artist);
    console.log('-------------*/');
    res.sendStatus(200);
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

MongoClient.connect('mongodb://localhost:27017/mongo', function (err, database) {
    if (err){
        return console.log(err);
    }
    db = database;
    app.listen(3012, function () {
        console.log('API app started');
    })
})
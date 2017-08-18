var express = require('express');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;
var db = require('./db');
var artists = require('./artists');
//var sleep = require('sleep');
var app = express();
app.use(express.static('/app'));
//var db;


exports.init = function(app) {
   app.get('/artists', function (req, res) {
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

    app.get('/artists/:id', function (req, res) {
        const query = {
          text: 'select id, name from artists where id= $1',
          values: [req.params.id]
        };
        db.get().query(query, (err, result) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        })
    })

    app.post('/artists', function (req, res) {
        const text = 'INSERT INTO artists(id, name) VALUES($1, $2)'
        const values = [req.body.id, req.body.name]

        // callback
        db.get().query(text, values, (err, result) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            return res.sendStatus(201);
          }
        })
    })

    app.put('/artists/:id', function (req, res) {
        const text = 'update artists set name = $2 where id = $1'
        const values = [req.body.id, req.body.name]
        db.get().query(text, values, (err, result) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            return res.sendStatus(200);
          }
        })
    })

    app.delete('/artists/:id', function (req, res) {
        const query = {
          text: 'delete from artists where id= $1',
          values: [req.params.id]
        };
        db.get().query(query, (err, result) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            return res.sendStatus(200);
          }
        })
    })

})
}
//var MongoClient = require('mongodb').MongoClient;
var pg = require('pg');
//var conString = "postgres://postgres:postgres@localhost:5432/postgres";


//client.connect();

var state = {
  db: null
};

exports.connect = function (url, done) {
    var client = new pg.Client(url);
    if (state.db){
        return done();
    }

    client.connect(function (err, db) {
        if (err){
            return done(err);
        }
        state.db = db;
        done();
    })
}

exports.get = function () {
    if (state.db) {
        return state.db;
    }
}
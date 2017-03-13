var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config.js');

var app = express();
app.use(bodyParser.json());

var port = 3000;


var db = massive.connect({
    connectionString: config.database
  },
  (err, localdb) => {
    db = localdb;
    app.set('db', db);
    db.set_products((err, data) => {
      if (err) console.log(err);
      else console.log('All tables successfully reset');
    });
  })

app.set('db', db); 

var db = app.get('db'); 

  app.listen(port, function() {
  console.log("Listening on port", port);
});
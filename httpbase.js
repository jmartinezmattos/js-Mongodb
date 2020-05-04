const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'baseDatos1';

// Create a new MongoClient
const client = new MongoClient(url);

var datos;

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Get the documents collection
  const collection = db.collection('Personas');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    datos= JSON.stringify(docs);

  });
  client.close();
});


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(datos);
  res.end('HOLA\n');
});


server.listen(port, hostname, () => {
  console.log('El servidor se esta ejecutando en http://${hostname}:${port}/');
})

import * as http from 'http';
import start from './demo.js';
//const http = require('node:http');
//const url = require('node:url');
//const demo = require('./demo');
const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    console.log(start);
    res.write('ciao');
  } else {
    res.write('Benvenuto sul mio profilo');
  }
  //res.write('benvenuto');
  res.end();
});

server.listen(8080);
server.on('start', () => {
  console.log('server is listening on port 8080');
});

const restify = require('restify');
const errs = require('restify-errors');
const net = require('net');
const fs = require('fs');

const server = restify.createServer({
  name: 'Prova :(',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.post('/create', (req, res, next) => {
  console.log(req.body);
  create(JSON.stringify(req.body));
  res.send();
  next();
});

server.post('/getAll', (req, res, next) => {
  let dados = fs.readFileSync('../ServidorAPP/clientes.txt', 'utf8')
  dados = dados.split('\n');
  res.send(dados);
  next();
});

function create(dados) {
  const ip = 'localhost';
  const porta = 8001;
  const cliente = new net.Socket();

  cliente.connect(porta, ip);
  cliente.write(dados);
  cliente.end();
}

server.get(/\/(.*)?.*/, restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html',
}));
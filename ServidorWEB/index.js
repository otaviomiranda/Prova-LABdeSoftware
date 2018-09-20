const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'Prova :(',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get(/\/(.*)?.*/,restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html',
}));

server.post('/create', (req, res, next) => {
    console.log(req.body);
});

const http = require('http');
const { server } = require('websocket');

const PORT = 5000;
const server = http.createServer((req, res) => {
  console.log('server started...');
  // req
});

let connection = null;
const webSocket = new server({
  httpServer: server,
  autoAcceptConnections: false
});

const allowOrigin = (origin) => {
  // filter origin
  return true;
};

webSocket.on('request', req => {
  if (!allowOrigin(req.origin)) {
    req.reject();
    console.log(`Request from origin ${req.origin} rejected.`);
    return;
  }
  connection = req.accept(null, req.origin);
  connection.on('open', () => console.log('Connection opened.'));
  connection.on('close', () => console.log('Connection disconnected.'));
  connection.on('message', (message) => {
    if (message.type === 'utf') connection.sendUTF(message.utf8Data);
    else if (message.type === 'binary') connection.sendBytes(message.binaryData);
  })
})

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

import net from 'net';
const server = net.createServer();
const config = {
  host: 'localhost',
  port: 3333,
  exclusive: true
};
const handleNewConnection = (socket: any) => {
  console.log('\n> New connection')
  socket.on('data', (data: any) => console.log({ data: JSON.parse(data.toString()) }));
  socket.on('error', (err: any) => {
    console.log({ error: err });
    socket.destroy();
    socket.end();
  });
};
server.on('connection', handleNewConnection);
server.listen(config);
server.on('listening', () => {
  console.log('Server is listening on %j', config.port);
});
server.on('error', (err) => {
  console.log('Server error: ', err);
});
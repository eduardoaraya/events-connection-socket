import net from 'net';
import { v4 as uuidv4 } from 'uuid';

const client = new net.Socket();
const config = {
  host: 'localhost',
  port: 3333,
  exclusive: true
}
function makeConnection(port: number, host: string) {
  const clientId = uuidv4();
  client.connect({ port, host }, () => {
    setInterval(() => {
      client.write(JSON.stringify({
        message: '> Hellow!',
        client: clientId
      }));
    }, 1000);
    client.on('connect', () => console.log("New client connected"));
    client.on('error', (err) => console.log('> Error: ', err));
    client.on('close', (err) => console.log('This is error? ', err));
  });
}
makeConnection(config.port, config.host);
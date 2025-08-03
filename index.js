import connectClient from './connectClient.js'


const client = await connectClient()

client.on('connected', (addr, port) => {
  console.log(`Connected to ${addr}:${port}`);
});

/** @type {(client: import('tmi.js').Client) => void} */
export default function botActions(client) {
   
    client.on('message', (channel, userstate, message, self) => {
        console.log(`Message from ${userstate.username}: ${message}`);
    });
}
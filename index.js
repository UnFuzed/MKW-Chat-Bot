import 'dotenv/config';
import tmi from 'tmi.js';

const config = {
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [process.env.TWITCH_CHANNEL]
}

const client = new tmi.Client(config);

client.on('message', (channel, tags, message, self) => {

    console.log(`${tags['display-name']}: ${message}`);
});

client.connect().catch(console.error);
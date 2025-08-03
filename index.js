import botActions from './botActions.js';
import connectClient from './connectClient.js'
import connectOBS from './connectOBS.js';

const client = await connectClient()
const obs = await connectOBS()

botActions(client, obs)
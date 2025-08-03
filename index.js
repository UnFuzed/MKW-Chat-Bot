import botActions from './botActions.js';
import connectClient from './connectClient.js'

const client = await connectClient()

botActions(client)
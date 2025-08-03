import 'dotenv/config'
import tmi from 'tmi.js'
import refreshToken from './refreshToken.js'

let client = null

function createClient(token) {
  return new tmi.Client({
    identity: {
      username: process.env.TWITCH_BOT_USERNAME,
      password: `oauth:${token}`
    },
    channels: [process.env.TWITCH_CHANNEL]
  })
}

export default async function connectClient() {
  try {
    const token = process.env.TWITCH_OAUTH_TOKEN.replace(/^oauth:/, '')
    let client = createClient(token)

    await client.connect()
    console.log('Connected!')

    return client
  } catch (err) {
    console.warn('Failed to connect:', err)

    const newToken = await refreshToken()
    process.env.TWITCH_OAUTH_TOKEN = `oauth:${newToken}`

    client = createClient(newToken)
    await client.connect()
    console.log('Reconnected after refreshing token!')

    return client
  }
}
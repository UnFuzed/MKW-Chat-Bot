import axios from 'axios'
import fs from 'fs'
import 'dotenv/config';

const {
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_REFRESH_TOKEN,
} = process.env

const TOKEN_URL = 'https://id.twitch.tv/oauth2/token'

export async function refreshToken(){
  try {
    const res = await axios.post(TOKEN_URL, null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: TWITCH_REFRESH_TOKEN,
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
      },
    })

    const { access_token, refresh_token, expires_in } = res.data

    console.log('Token refreshed!')
    console.log('New Access Token:', access_token)
    console.log(' New Refresh Token:', refresh_token)
    console.log('Expires in:', expires_in, 'seconds')

    const envFile = fs.readFileSync('.env', 'utf-8')
    const updatedEnv = envFile
      .replace(/TWITCH_OAUTH_TOKEN=.*/g, `TWITCH_OAUTH_TOKEN=oauth:${access_token}`)
      .replace(/TWITCH_REFRESH_TOKEN=.*/g, `TWITCH_REFRESH_TOKEN=${refresh_token}`)

    fs.writeFileSync('.env', updatedEnv)

    console.log(access_token, 'has been saved to .env file')
    return access_token

  } catch (err) {
    console.error('Failed to refresh token:', err.response?.data || err.message)
  }
}


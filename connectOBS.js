import OBSWebSocket from 'obs-websocket-js';
import 'dotenv/config';

export default async function connectOBS() {
    
  const obs = new OBSWebSocket();

  try {
    await obs.connect(process.env.OBS_WEBSOCKET_URL, process.env.OBS_WEBSOCKET_PASSWORD);
    console.log('Connected to OBS!')

    return obs;

  } catch (error) {
    console.error('OBS connection error:', error);
  }
}

import OBSWebSocket from 'obs-websocket-js';

/**
 * @param {import('tmi.js').Client} client
 * @param {import('obs-websocket-js').OBSWebSocket} obs
 */
export default function botActions(client, obs) {
   
    obs.on('CurrentProgramSceneChanged', (data) => {
        // console.log('Scene changed in OBS!');
        client.say('#UnFuzed_', `Scene changed to ${data.sceneName}`);
    });   
}
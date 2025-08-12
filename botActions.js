import OBSWebSocket from 'obs-websocket-js';

/**
 * @param {import('tmi.js').Client} client
 * @param {import('obs-websocket-js').OBSWebSocket} obs
 */
export default async function botActions(client, obs) {
   
    obs.on('CurrentProgramSceneChanged', (data) => {
        // console.log('Scene changed in OBS!');
        client.say('#UnFuzed_', `Scene changed to ${data.sceneName}`);
    });   

    client.on('message', async (channel, tags, message, self) => {
        if (self) return; 

        if (message === '!plusone')
        {

            const { inputSettings } = await obs.call("GetInputSettings", {inputName: 'Counter'})

            let counterValue = parseInt(inputSettings.text) || 0;

            counterValue += 1;

            await obs.call('SetInputSettings', {
               inputName: 'Counter',  
                inputSettings: {
                    text: counterValue.toString()
                }
            });
        }
    })
}
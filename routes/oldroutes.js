const express = require('express');
require('dotenv').config();
const router = express.Router();
const { WebClient } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;
const token = process.env.SLACK_TOKEN;
// Initialize
const web = new WebClient(token, { retries: 0 });
// Example of handling options request within block elements


/*
router.post('/mongo/documents', (req, res) => {
    console.log('loading mongo');
    //res.status(200).send();
    const opt = [];
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });

    async function getDocuments(){
        try {
            await client.connect();
            res = await client.db().collection("TasksCol").find({}).toArray();
            console.log(res); 
            return (res);    
                }          
        catch (e) {
        console.error(e);
        }
        finally {
            await client.close();
        }}
    getDocuments().catch(console.error);
    app.options({'action_id': 'text1234'}, async ({ options, ack }) => {
            const opt = []
        
            for(let i=0; i < 3; i++) {
            opt.push({
                "text": {
                "type": "plain_text",
                "text": `*this is plain_text text* ${i}`
                },
                "value": `value-${i}`
            });
            }
        
            ack({
            "options": opt
            });
        });
        app.action('text1234', ({ ack }) => {
            ack();
        });
    
    });
*/

router.post('/slack/morn', (req, res) => {
const { trigger_id: triggerId } = req.body;



res.status(200).send('');
(async () => {
    // Open a modal.
    await web.views.open({
    trigger_id: triggerId,
    view: {
        type: 'modal',
        title: {
        type: 'plain_text',
        text: 'Good Morning!',
        },
        submit: {
        type: 'plain_text',
        text: 'Submit',
        },
        callback_id: 'morn',
        blocks:[
            {
              "type": "section",
              "block_id": "section678",
              "text": {
                "type": "mrkdwn",
                "text": "Pick an item from the dropdown list"
              },
              "accessory": {
                "action_id": "text1234",
                "type": "external_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select an item"
                },
                "min_query_length": 0
              }
            }
          ]
          /*
        blocks: [
        {
            type: 'section',
            text: {
            type: 'plain_text',
            text: ':wave: We will get back to you as soon as possible',
            emoji: true,
            },
        },
        {
            type: 'divider',
        },

        {
            type: 'input',
            block_id: 'title',
            label: {
            type: 'plain_text',
            text: 'Title',
            emoji: true,
            },
            element: {
            type: 'plain_text_input',
            multiline: false,
            action_id: 'title',
            },
        },
        {
            type: 'input',
            block_id: 'description',
            label: {
            type: 'plain_text',
            text: 'Description',
            emoji: true,
            },
            element: {
            type: 'plain_text_input',
            multiline: true,
            action_id: 'description',
            },
            optional: true,
        },
        ],*/
    },
    });
})();
});

router.post('/slack/interactions', (req, res) => {

res.status(200).send();

const payload = JSON.parse(req.body.payload);

// view the payload on console
console.log(payload);

if (
    payload.type === 'view_submission' &&
    payload.view.callback_id === 'morn'
) {
    const { values } = payload.view.state;
    const title = values.title.title.value;
    const description = values.description.description.value;

    console.log(`title ----->${title}`, `description---->${description}`);
    // Save the title and description to the database or handle it as you may deem fit.

}
});

module.exports = router;


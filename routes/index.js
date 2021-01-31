const express = require('express');
require('dotenv').config();
const router = express.Router();
const { WebClient } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { onErrorResumeNext } = require('rxjs');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;
const token = process.env.SLACK_TOKEN;
// Initialize
const web = new WebClient(token, { retries: 0 });
//import { connect } from 'ngrok';
//import { connect } from 'ngrok';
// Example of handling options request within block elements


/*
async function listDatabases(client){
    res = await client.db().collection("TasksCol").find({}).toArray();
    //console.log(res);
    res.forEach(task => tasks.push(task.name));
};

async function database(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
    try {
        await client.connect();
        await listDatabases(client);
        console.log('hey');
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
database().catch(console.error);
*/
//console.log('erewr', tasks);
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
   
    
    });
*/

router.post('/slack/morn', (req, res) => {





res.status(200).send('');
(async () => {
    // Open a modal.
    var tasks = []
async function listDatabases(client){
    res = await client.db().collection("TasksCol").find({}).toArray();
    //console.log(res);
    res.forEach(task => tasks.push(task.name));
};

 async function database(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
    try {
        await client.connect();
        await listDatabases(client);
        console.log('hey');
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
    database().catch(console.error);
    
    
    var options=[]
    
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    tasks.forEach((t,i) => options.push({"text": {
        "type": "plain_text",
       "text": `${tasks[i]}`
     },
        "value": `value-${i}`}))
     options=JSON.stringify(options);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(tasks);
    console.log(tasks[0]);
    console.log(options);
    const { trigger_id: triggerId } = req.body;
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
                        "text": "Pick which tasks you want to take on!"
                      },
                      "accessory": {
                        "action_id": "text1234",
                        "type": "multi_static_select",
                        "placeholder": {
                          "type": "plain_text",
                          "text": "Select items"
                        },
                        "options": JSON.stringify(options)
                        //"options":  [{"text":{"type":"plain_text","text":"task1"},"value":"value-0"},{"text":{"type":"plain_text","text":"task2"},"value":"value-1"},{"text":{"type":"plain_text","text":"task3"},"value":"value-2"},{"text":{"type":"plain_text","text":"task4"},"value":"value-3"},{"text":{"type":"plain_text","text":"task5"},"value":"value-4"},{"text":{"type":"plain_text","text":"task6"},"value":"value-5"}]    
                          /*
                                                        {
                            "text": {
                              "type": "plain_text",
                              "text": `${tasks[0]}`
                            },
                            "value": "value-0"
                          }
                          */
                          
                        
                      }
                    }
                  ]
              }
            }

    );
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
    console.log('hoooo \n\n')

    console.log(values.section678.text1234.selected_options)
    //const title = values.title.title.value;
    //const description = values.description.description.value;

    //console.log(`title ----->${title}`, `description---->${description}`);
    // Save the title and description to the database or handle it as you may deem fit.

}
});

module.exports = router;


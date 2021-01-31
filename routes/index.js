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
//import { connect } from 'ngrok';
//import { connect } from 'ngrok';
// Example of handling options request within block elements

var tasks = []

router.post('/slack/morn', (req, res) => {
res.status(200).send('');
(async () => {
    // Open a modal.
    var tasks = []
async function listDatabases(client){
    res = await client.db().collection("TasksCol").find({    
            status: {
                $eq: 'not_started'
           }}
    ).toArray();
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
    
    await new Promise(resolve => setTimeout(resolve, 500));

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
                        "text": "Pick which tasks you want to take on! :nerd_face:"
                      },
                      "accessory": {
                        "action_id": "text1234",
                        "type": "multi_static_select",
                        "placeholder": {
                          "type": "plain_text",
                          "text": "Select items"
                        },
                        "options": options
                      }
                    }
                  ]
              }
            }

    );
})();
});

router.post('/slack/evening', (req, res) => {
    res.status(200).send('');
    user=String(req.body.user_name);
    (async () => {
        // Open a modal.
 
    async function listDatabases(client){
        res = await client.db().collection("TasksCol").find({    
                status: {
                    $eq:'assigned'
               }, assigned_to:{
                   $eq:`${user}`
               }
            }
        ).toArray();
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
     tasks=[];
        database().catch(console.error);
        
        
        var blocks=[]
        var accessory={
            "type": "static_select",
            "placeholder": {
                "type": "plain_text",
                "text": "Select %",
                "emoji": true
            },
            "options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "10%",
                        "emoji": true
                    },
                    "value": "value-0"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "20%",
                        "emoji": true
                    },
                    "value": "value-1"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "30%",
                        "emoji": true
                    },
                    "value": "value-2"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "40%",
                        "emoji": true
                    },
                    "value": "value-3"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "50%",
                        "emoji": true
                    },
                    "value": "value-4"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "60%",
                        "emoji": true
                    },
                    "value": "value-5"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "70%",
                        "emoji": true
                    },
                    "value": "value-6"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "80%",
                        "emoji": true
                    },
                    "value": "value-7"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "90%",
                        "emoji": true
                    },
                    "value": "value-8"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "100%",
                        "emoji": true
                    },
                    "value": "value-9"
                }
            ],
            "action_id": "static_select-action"
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
       console.log(tasks); 
       tasks.forEach((t,i) => blocks.push( 
            {
                "block_id": `sect${i}`,
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Percentage Done for ${tasks[i]}`
                },
                "accessory": accessory
            }
        ))
        
        //await new Promise(resolve => setTimeout(resolve, 500));
         
        
        const { trigger_id: triggerId } = req.body;
        await web.views.open({
        trigger_id: triggerId,
        view: {
            type: 'modal',
            title: {
            type: 'plain_text',
            text: 'Good Evening!',
            },
            submit: {
            type: 'plain_text',
            text: 'Submit',
            },
            callback_id: 'evening',
            
                "blocks": blocks
            }
                  }
                
    
        );
    })();
    });

router.post('/slack/interactions', (req, res) => {

    res.status(200).send();

    const payload = JSON.parse(req.body.payload);

    // view the payload on console
    //console.log(payload);

    if (
        payload.type === 'view_submission' &&
        payload.view.callback_id === 'morn'
    ) {
    const { values } = payload.view.state;

    user=payload.user.username;
    selected=values.section678.text1234.selected_options;
    clean=[];
    selected.forEach(s => clean.push(s.text.text));
    console.log(clean);

    async function UpdateTasks(client){
        for (var c = 0; c < clean.length; c++) {
           // console.log(c, clean[c])
        
           const res= await 
            client.db().collection("TasksCol").updateMany(
              {name: `${clean[c]}`},
              {$set: {assigned_to: `${user}`, status: 'assigned'}}
            )
          console.log(res);
        
        
        } 
    };
    async function database(){
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
        try {
            await client.connect();
            await UpdateTasks(client);
            console.log('hey');
        } catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
    };
    database().catch(console.error);
  

    }





    if (
        payload.type === 'view_submission' &&
        payload.view.callback_id === 'evening'
    ) {
    const { values } = payload.view.state;
        
    //user=payload.user.username;
    clean=[];
    
    Object.keys(values).forEach(function(key) {
        console.log(values[key]);
        clean.push(values[key]["static_select-action"].selected_option.text.text)
    });

    console.log(clean);

    async function UpdateTasks(client){
        for (var c = 0; c < clean.length; c++) {
           console.log(tasks[c], clean[c])
        
           const res= await 
            client.db().collection("TasksCol").updateMany(
              {name: `${tasks[c]}`},
              {$set: {percentage_complete: `${parseInt(clean[c].slice(0, -1))}`, status:`${clean[c]}`=='100%' ? 'complete' : 'assigned' }
              })
          console.log(res);
        
        
        } 
    };
    async function database(){
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
        try {
            await client.connect();
            await UpdateTasks(client);
            console.log('hey');
        } catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
    };
    database().catch(console.error);
    

    }
    });

module.exports = router;


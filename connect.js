const tasks=[];
async function listDatabases(client){
    res = await client.db().collection("TasksCol").find({}).toArray();
    //console.log(res);
    res.forEach(task => tasks.push(task.name));
};

async function main(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbUser:foxesandrabbits@clusterbot.hhzyj.mongodb.net/TasksDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
export {    tasks   };

main().catch(console.error);


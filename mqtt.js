const mqtt = require('mqtt');
const client = mqtt.connect('mqtt:/broker.hivemq.com');

client.on('connect',()=>{
    client.subscribe('message');
})
const publishMsg =(message,from_user,to_user)=>{
    client.publish('message',JSON.stringify({
      message: message,
      from_user:from_user,
      to_user:to_user
    }))
}

client.on('message',(topic,message)=>{
    if(topic==='messgae'){
        console.log(JSON.parse(message))
    }
})
module.exports = publishMsg;
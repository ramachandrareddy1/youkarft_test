
const { dbQuery } = require('../database/queries');
const publishMsg = require('../mqtt');

//2. Create message
const createMessage = async (req, res) => {
    try {
        console.log('req.useid',req.userId)
        const { text } = req.body;
        const dbClient = global.dbClient;
        const fromUser = req.userId;
        await dbQuery('INSERT INTO messages (text, from_user,is_sent) VALUES ($1, $2,$3)', [text, fromUser,false],dbClient);
        res.status(200).json({message:"Message created successfully"});
    } catch (err) {
        console.log('err',err);
        res.status(500).json({ message: "server side issue", error: err });
    }
}

//3. Send message to user (Adding a message to an MQ)

const sendMessage = async (req, res) => {
    try {
        console.log('req.useid',req.userId)
        const { messageId,toUserId } = req.body;
        const dbClient = global.dbClient;
        const fromUser = req.userId;
        const toUser = toUserId;
        const {rows:message} = await dbQuery('SELECT text from message where id=$1',[messageId])
        await publishMsg(message[0].text,fromUser,toUserId);
        await dbQuery('UPDATE messages (to_usr,is_sent,date) VALUES ($1, $2,$3)', [toUser,true,CURRENT_TIMESTAMP],dbClient);
        res.status(200).json({message:"Message created successfully"});
    } catch (err) {
        console.log('err',err);
        res.status(500).json({ message: "server side issue", error: err });
    }
}
module.exports = {
    createMessage,
    sendMessage
}
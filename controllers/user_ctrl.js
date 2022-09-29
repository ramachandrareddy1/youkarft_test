
const { dbQuery } = require('../database/queries');
const { generateToken} = require('../utils/jwtTokes');

const signupCtrl = async (req, res) => {
    try {
        const { email, password, user_name } = req.body;
        const dbClient = global.dbClient;
        const {rows: user}= await dbQuery('SELECT * FROM users WHERE email = $1', [email], dbClient);
        console.log('user',user);
        if (user.length) {
            res.status(403).json({ message: "User already exist !" })
        } else {
          const userId = await dbQuery('INSERT INTO users (email, password,user_name) VALUES ($1, $2,$3) RETURNING id', [email, password,user_name],dbClient);
          res.status(200).json({message:"User created successfully",token:  generateToken(userId)});
        }
    } catch (err) {
        res.status(500).json({ message: "server side issue", error: err });
    }
}

const loginCtrl = async(req,res)=>{
    try {
        const { email, password} = req.body;
        const dbClient = global.dbClient;
        const {rows: user}= await dbQuery('SELECT * FROM users WHERE email = $1 AND password = $2', [email,password], dbClient);
        if (!user.length) {
            res.status(403).json({ message: "Invalid credentials" })
        } else {
          res.status(200).json({message:"User login successfully",token:  generateToken(user[0]['id'])});
        }
    } catch (err) {
        res.status(500).json({ message: "server side issue", error: err });
    }
}

// 1. Get one/all users
const fetchUsers = async(req,res)=>{
    try {
        const userId =req.query.userId;
        let query ='';
        let params = [];
        if(userId){
            query= 'SELECT * FROM users WHERE id = $1';
            params =[userId]
        }else {
            query= 'SELECT * FROM users';
        }
        const dbClient = global.dbClient;
        const {rows: users}= await dbQuery(query,params, dbClient);
        res.status(200).json({users:users});

    } catch (err) {
        res.status(500).json({ message: "server side issue", error: err });
    }
}

//4. Get all sent messages by user
const allMessagesSendByUser = async(req,res)=>{
    try {
        const fromUser = req.userId
        const query= 'SELECT * FROM users LEFT JOIN messages ON users.id = messages.from_user WHERE users.id=$1 ';
        const params = [fromUser]
        const dbClient = global.dbClient;
        const {rows: userData}= await dbQuery(query,params, dbClient);
        res.status(200).json({userData});

    } catch (err) {
        res.status(500).json({ message: "server side issue", error: err });
    }
}

//5. Get all received messages by user
const allMessagesReceivedByUser = async(req,res)=>{
    try {
        const toUser = req.userId
        const query= 'SELECT * FROM users LEFT JOIN messages ON users.id = messages.to_usr WHERE users.id=$1';
        const params = [toUser]
        const dbClient = global.dbClient;
        const {rows: userData}= await dbQuery(query,params, dbClient);
        res.status(200).json({data:userData});

    } catch (err) {
        res.status(500).json({ message: "server side issue", error: err });
    }
}
module.exports = {
    signupCtrl,
    loginCtrl,
    fetchUsers,
    allMessagesSendByUser,
    allMessagesReceivedByUser
};
const jwt = require('jsonwebtoken');
const authenticateUser = (req,resp,next)=>{
    try {
      console.log('token', req.headers.authorization)
        const token = req.headers.authorization;
        if(!token){
          throw Error()
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRECT);
        console.log(decoded)
        req.userId=  decoded.data
        next();
      } catch(err) {
        console.log('err',err);
        return resp.status(403).json({
            message:"unAuthorized user"
        });
      }
}

module.exports ={
  authenticateUser
}
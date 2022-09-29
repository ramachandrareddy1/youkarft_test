const jwt = require('jsonwebtoken');
const generateToken = (id)=>{
    return jwt.sign({
        data: id
      }, process.env.TOKEN_SECRECT, { expiresIn: '1h' });
};

module.exports = {
    generateToken
}

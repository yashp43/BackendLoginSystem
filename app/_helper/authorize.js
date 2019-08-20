const expressJwt = require('express-jwt');
const jwt = require('../../config/jwt.config.js');
const secret = jwt.secret;

function authorize() {
    return [
        expressJwt({ secret }), (req, res, next) => {
            console.log('token authorized');
            next();
        }
    ];
}

module.exports = authorize;
const { logger } = require('../../infrastructure/logging/logger');
const config = require('../auth-api/config');
const jwt = require('jsonwebtoken');

/*
* middleware function for checking the authentication of token
*/
const validateToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) 
        res.status(400).send({ auth : false, error : "No token provided." });

    jwt.verify(token, config.secret, (err, encoded) => {
        if(err) {
            res.status(403).send({ auth : false, error : "Failed to verify token."});
            logger.log('warn','couldnt verify token ' + token);
        }
        req.teammemberId = encoded.id;
        req.emailAddress = encoded.id;

        return next();
    });
};

module.exports = {
    validateToken
};
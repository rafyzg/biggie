
const { models } = require('../../infrastructure/db/');
const logger = require('../../infrastructure/logging/logger');
const config = require('./config');
const jwt = require('jsonwebtoken');

/**
* Checks in the database if user with this email & password exists, if yes then continue to the next function
* if no - then send 403K
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
*/
const verifyLogin = async(req, res, next) => {
    let user;
    try {
        user = await models.teammember.findOne({ where : {emailAddress : req.body.emailAddress} });
    } catch(err) {
        throw Error(err);
    }
    if(!user) {
        res.status(403).send({error : "Invalid email address"});
    }
    else {
        let hashedPassword = req.body.password;
        if(user.password == hashedPassword) {
            req.body = {
                id : user.id,
                emailAddress : user.emailAddress
            };
            return next();
        }
        else {
            logger.warn('Invalid login ${req.body.emailAddress}');
            res.status(403).send({ error : "Invalid email address or password" });
        }
    }
};

/*
* After user is verified, token is created and sent.
*/
const login = (req, res) => {
    try {
        let accessToken = jwt.sign(req.body, config.secret , {expiresIn : '24h'});
        res.status(201).send({ auth : true, token : accessToken });
    } catch(err) {
        res.status(502).send({ error : err});
    }
};

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
            logger.warn('couldnt verify token ' + token);
        }
        req.teammemberId = encoded.id;
        req.emailAddress = encoded.id;

        return next();
    });
};
/*
* Apply validateToken for all routes except \login
*/
const validateMember = (req, res, next) => {
    if(req.path == '/login') { //No need to check token
        return next();
    } else {
        validateToken(req, res, next);
    }
};

module.exports = {
    verifyLogin,
    login,
    validateMember
};
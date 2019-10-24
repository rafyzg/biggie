
const { models } = require('../../infrastructure/db/');
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
        user = await models.teammember.findOne({ where : { emailAddress: req.body.emailAddress} });
    } catch(err) {
        logger.log('error', 'wasnt able to reach database and find user' );
        throw Error(err);
    }
    if(!user) {
        res.status(403).json({error : "Invalid email address"});
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
            logger.log('error',`Invalid login ${req.body.emailAddress}`);
            res.status(403).json({ error : "Invalid email address or password" });
        }
    }
};

/*
* After user is verified, token is created and sent.
*/
const login = (req, res) => {
    let accessToken;
    try {
        accessToken = jwt.sign(req.body, config.secret , {expiresIn : '24h'});
        res.status(201).send({ auth : true, token : accessToken });
    } catch(err) {
        logger.log('error',`Login error ${err}`);
        res.status(502).send({ error : err});
    }
};

module.exports = {
    verifyLogin,
    login
};
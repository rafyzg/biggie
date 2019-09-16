
const { models, initDb } = require('../../infrastructure/db/');
const config = require('./config');
const jwt = require('jsonwebtoken');

const verifyLogin = async(req, res, next) => {

    const user = await models.teammember.findOne({ where : {emailAddress : req.body.emailAddress} })
    if(!user) {
        res.status(404).send({error : "Invalid email address"});
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
            res.status(404).send({ error : "Invalid email address or password" });
        }
    }
};

const login = (req, res) => { 
    try {
        let accessToken = jwt.sign(req.body, config.secret , {expiresIn : '24h'});
        res.status(201).send({ auth : true, token : accessToken });
    } catch(err) {
        res.status(404).send({ error : err});
    }
};

const validateToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) 
        res.status(400).send({ auth : false, error : "No token provided." });

    jwt.verify(token, config.secret, (err, encoded) => {
        if(err) {
            res.status(403).send({ auth : false, error : "Failed to verify token."});
        }

        req.teammemberId = encoded.id;
        req.emailAddress = encoded.id;

        return next();
    });
};

const validateMember = (req, res, next) => {
    if(req.path == '/login') { //No need to check token
        return next();
    } else {
        validateToken(req, res, next);
    }
}

module.exports = {
    verifyLogin,
    login,
    validateMember
};
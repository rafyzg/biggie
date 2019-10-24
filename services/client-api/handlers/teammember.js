const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
/**
* Gets Teammember info by id
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
*/
const getTeammember = async(req, res) => {
    let teammember;
    try {
        teammember = await models.teammember.findByPk(req.teammemberId,
            { attributes: {exclude: ['password']} 
        });
        res.send(teammember);
    } catch(err) {
        logger.log('error',`Errror getting teammember ${err}`);
        res.status(500).json({ 'error' : 'error searching for teammember'});
    }
};
/**
* Finds Teammember by email
*/
const getTeammemberByEmail = async(req, res) => {
    let teammember;
    try {
        teammember = await models.teammember.findOne({ where : { emailAddress : req.parmas.teamMemberEmail },
            attributes: { exclude: ['password'] }
         });
        res.send(teammember);
    } catch (err) {
        logger.log('error',`Errror getting teammember ${err}`);
        res.status(500).json({ 'error' : 'error searching for teammember'});
    }
};

module.exports = {
    getTeammember,
    getTeammemberByEmail
}

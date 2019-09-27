const { models } = require('../../../infrastructure/db');

/**
* Gets Teammember info by id
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
*/
const getTeammember = async(req, res, next) => {
    try {
        const teammember = await models.teammember.findByPk(req.teammemberId,{ attributes: {exclude: ['password']} });
        res.send(teammember);
    } catch(err) {
        throw Error(err);
    }
};
/**
* Finds Teammember by email
*/
const getTeammemberByEmail = async(req, res, next) => {
    try {
        const teammember = await models.teammember.findOne({ where : { emailAddress : req.parmas.teamMemberEmail },
            attributes: { exclude: ['password'] }
         });
        res.send(teammember);
    } catch (err) {
        throw Error(err);
    }
};

module.exports = {
    getTeammember,
    getTeammemberByEmail
}

const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
/**
* Add group to a specific board
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
*/
const addGroup = async(req, res) => {
    let group;
    try {
        //Creating the new group
        group = await models.group.create({ label : req.body.label, boardId : req.body.boardId });
        res.status(201).send(group);
    } catch(err) {
        logger.log('error',`Errror adding group - ${req.teammemberId} - ${err}`)
        res.status(500).json({ 'error' : 'Error adding group'});
    }
};
/**
* Get group info by groupId
 */
const getGroup = async(req, res) => {
    let group;
    try {
        //Fetch the requested group
        group = await models.group.findByPk(req.params.groupId);
        res.json(group);
    } catch(err) {
        logger.log('error',`Errror finding group- ${req.teammemberId} - ${err}`);
        res.status(500).json({error : `Cant reach the requested group`});
    }
};

module.exports = {
    addGroup,
    getGroup
};
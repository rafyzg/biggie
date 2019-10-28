const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
/**
* Gets the boardId of the group
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
 */
const getGroupBoardId = async(req, res, next) => {
    let group;
    try {
        group = await models.group.findByPk(req.params.groupId);
        req.params.boardId = group.boardId;
        return next();
    } catch(err) {
        logger.log('error',`Errror finding group's board- ${req.teammemberId} - ${err}`);
        throw new Error(`Error : searching for group's board ${err}`);
    }
};

module.exports = {
    getGroupBoardId
};
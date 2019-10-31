const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
const { body } = require('express-validator');

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

const groupRules = [
    //Label must exist
    body('label').exists().withMessage("Must specify group label"),
    //Board id must exist and be a number
    body('boardId').exists().isNumeric().withMessage('Must specify boardId of the group')
];

module.exports = {
    getGroupBoardId,
    groupRules
};
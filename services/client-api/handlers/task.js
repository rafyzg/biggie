const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
/**
* Add task to a specific group, with a teammemberId
* @param {*} req express request
* @param {*} res express response
*/
const addTask = async(req, res) => {
    const task = {
        label : req.label,
        status : 'unfinished',
        metadata : req.metadata,
        groupId : req.groupId,
        teammemberId : req.teammemberId
    };
    try {
        await models.task.create(task);
        res.status(201).send("Successfully created a new task");
    } catch(err) {
        logger.warn(err);
        throw Error(err);

    }
};

module.exports = {
    addTask
};

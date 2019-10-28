const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
/**
* Add task to a specific group, with a teammemberId
* @param {*} req express request
* @param {*} res express response
*/
const addTask = async(req, res) => {
    let task, newTask;
    try {
        task = {
            label : req.body.label,
            status : req.body.status || 'unfinished',
            metadata : req.body.metadata,
            groupId : req.body.groupId,
            teammemberId : req.teammemberId
        };
        let newTask = await models.task.create(task);
        res.status(201).send(newTask);
    } catch(err) {
        logger.log('error',`Error adding task - ${req.teammemberId} - ${err}`);
        res.status(500).json({ 'error' : 'Error adding task'});
    }
};
/**
* Get information about task, using boardId, groupId and taskId
* @param {*} req express request
* @param {*} res express response
*/
const getTask = async(req, res) => {
    let task;
    try {
        let boardId = req.params.boardId;
        task = await models.group.findOne({ where : { id : req.params.groupId, boardId }, 
            include : [{ model : models.task, as : 'tasks', where : { id : req.params.taskId } } ]});
        res.send(task);
    } catch(err) {
        logger.log('error',`Error finding task - ${req.teammemberId} - ${err}`);
        res.status(500).json({ 'error' : 'Error finding task'});
    }
};

module.exports = {
    addTask,
    getTask
};

const { models } = require('../../../infrastructure/db');
/**
* Add group to a specific board
* @param {*} req express request
* @param {*} res express response
* @param {*} next passing to next middleware function
*/
const addGroup = async(req, res, next) => {
    try {
        await models.group.create({ label : req.body.label, boardId : req.body.boardId });
        res.send("Successfully created a new group");
    } catch(err) {
        throw Error(err);
    }
};

module.exports = {
    addGroup
};
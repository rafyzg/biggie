const { body } = require('express-validator');

const taskRules = [
    //Label must exist
    body('label').exists().withMessage("Must specify task label"),
    //Group id must exist and be a number
    body('groupId').exists().isNumeric()
];

module.exports = {
    taskRules
};


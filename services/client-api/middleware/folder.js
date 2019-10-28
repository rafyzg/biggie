const { body } = require('express-validator');

const folderRules = [
    //Label must exist
    body('label').exists().withMessage("Must specify folder label"),
]

module.exports = {
    folderRules
};
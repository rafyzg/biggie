const { getSequelize } = require('../../../infrastructure/db');
const { logger } = require('../../../infrastructure/logging/logger');
const { body, validationResult } = require('express-validator');

/*
* Checks with a given boardId and given teammemberId if the user is a member in this board
*/
const isBoardMember = async(req, res, next) => {
    let sequelize;
    try {
        sequelize = await getSequelize();
    } catch(err) {
        logger.log('error',`Cant get sequalize ${err}`);
        process.exit(1); //Fatal :: can't get sequalize
    }
    let isMember;
    try { //Check if teammember belongs to given board
        isMember = await sequelize.query('SELECT * FROM board_teammember WHERE "boardId" = (:boardId) AND "teammemberId" = (:teammemberId)',{
            replacements : { boardId : req.params.boardId, teammemberId : req.teammemberId},
            type: sequelize.QueryTypes.SELECT });
        if(!isMember.length) {
            res.staus(401).json({ error : "Didn't find this board"});
        }
        return next();
    } catch(err) {
        logger.log('error',`error reaching the board  - ${req.params.boardId} - ${err}`);
        res.status(500).json({"error" : "Error reaching this board"});
    }
};

/*
* Set post request validation rules
*/
const boardRules = [
        //Label must exist
        body('label').exists().withMessage("Must specify board label"),
        //Folder id must be a number
        body('folderId').optional().isNumeric()
];

/*
* Checks the post request meets the requirements
*/
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param] : err.msg }));

    return res.status(422).json({
        errors : extractedErrors
    });
};

module.exports = {
    isBoardMember,
    boardRules,
    validateRequest
};
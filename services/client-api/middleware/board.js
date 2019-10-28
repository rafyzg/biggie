const { getSequelize } = require('../../../infrastructure/db');
const { logger } = require('../../../infrastructure/logging/logger');

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

module.exports = {
    isBoardMember
};
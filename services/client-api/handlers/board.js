const { models } = require('../../../infrastructure/db');
const { getSequelize } = require('../../../infrastructure/db');
const { logger }= require('../../../infrastructure/logging/logger');

/**
* Finds all the boards of specific Team member
* @param {*} req express request
* @param {*} res express response
*/
const getBoards = async(req, res) => {
    let boards;
    try {
        boards = await models.teammember.findByPk(req.teammemberId, { include : [
            { model : models.board, as : 'boards', through: { attributes: [] }}
        ], attributes: [] });
        res.send(boards);
    } catch(err) {
        logger.log('error',`Error getting boards of teammeber - ${req.teammemberId} - ${err}`);
        res.status(500).json({ error : " Error getting boards"});
    }
};
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
    try {
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
/**
 * Find all data about request board - including groups and tasks inside board
 */
const getBoard = async(req, res) => {
    let board;
    try {
        board = await models.board.findOne({ where : { id : req.params.boardId}, include : [
            { model : models.group, as : 'groups', where : { boardId : req.params.boardId }, include : [
               { model : models.task, as : 'tasks' }
            ]},
        ]});
        res.send(board);
    } catch(err) {
        logger.log('error',`Errror getting board ${err}`);
        res.staus(500).json({ error : "can't find teammember's folder"});
    }
};

/**
* Creates new Board
*/
const addBoard = async(req, res) => {
    const folderId = req.body.folderId || null;
    let board, member;
    try {
        board = await models.board.create({ label : req.body.label, folderId });
    } catch(err) {
        logger.log('error',`Errror adding new board ${err}`);
        res.status(500).json({ error : `Error creating new board ${err}`});
    }

    //If board didn't create properly
    if(!board) { 
        res.status(500).json({ error : `Error adding new board`});
    }

    try {
        member = await models.teammember.findByPk(req.teammemberId);
    } catch(err) {
        logger.log('error',`Error finding logged user id. ${err}`);
        res.status(500).json({ error : `Error finding logged teammember` });
    }

    //If member wasn't found
    if(!member) {
        res.status(500).json({ error : `Error adding new board and finding teammember`});
    }

    try { //Try attaching the new created board with the logged in user
        await req.board.setTeammembers(member, {});
        res.status(201).json({ message : "Added a new Board" });
    } catch(err) {
        logger.log('error',`Errror adding teammember to board ${err}`);
        res.status(500).json({ error : `Error adding new board and finding teammember` });
    }
};

/*
 *Given a teammemberId, the function adds the member to the board
*/
const addBoardTeammember = async(req, res) => {
    let member;
    let teammemberId = req.teammemberId;
    try {
        member = await models.teammember.findByPk(teammemberId);
    } catch(err) {
        logger.log('error',`Error finding logged user id. ${err}`);
        res.status(500).json({ error : `Error adding new teammember to created board` });
    }

    try {
        await req.board.setTeammembers(member, {});
        res.status(201).send({message : "Added a new Board"});
    } catch(err) {
        logger.log('error',`Errror adding teammember to board ${err}`);
        res.status(500).json({ error : `Error adding new teammember to created board` });
    }
};

/**
* Finds all the Teammembers of specific board
*/
const getBoardTeammembers = async(req, res) => {
    let members;
    try {
        members = await models.board.findByPk(req.params.boardId, { include : [
            { model : models.teammember, as : 'teammembers', attributes : { exclude : ['password']}, 
            through: { attributes: [] }}
        ]}); 
        res.send(members);
    } catch(err) {
        logger.log('error',`Errror getting teammembers of board ${err}`);
        res.status(500).json({ error : `cant find board teammembers ${req.teammemberId}` });
    }
}


module.exports = {
    getBoards,
    addBoard,
    isBoardMember,
    getBoard,
    addBoard,
    addBoardTeammember,
    getBoardTeammembers
}
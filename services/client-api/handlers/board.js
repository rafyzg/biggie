const { models } = require('../../../infrastructure/db');
const { getSequelize } = require('../../../infrastructure/db');
const { logger }= require('../../../infrastructure/logging/logger');

/**
* Finds all the boards of specific Team member
* @param {*} req express request
* @param {*} res express response
*/
const getBoards = async(req, res) => { //Not working yet
    try {
        const boards = await models.teammember.findByPk(req.teammemberId, { include : [
            { model : models.board, as : 'boards', through: { attributes: [] }}
        ], attributes: [] });
        res.send(boards);
    } catch(err) {
        logger.log('error',`Errror getting boards of teammeber ${req.teammemberId} ${err}`);
        throw Error(err);
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
    }

    try {
        const isMember = await sequelize.query('SELECT * FROM board_teammember WHERE "boardId" = (:boardId) AND "teammemberId" = (:teammemberId)',{
            replacements : { boardId : req.params.boardId, teammemberId : req.teammemberId},
            type: sequelize.QueryTypes.SELECT });
        if(!isMember.length) {
            res.statusCode = 401;
            res.send({ error : "Didn't find this board"});
        }
        return next();
    } catch(err) {
        logger.log('error',`${err}`);
        res.send("Error reaching this board");
    }
};
/**
 * Find all data about request board - including groups and tasks inside board
 */
const getBoard = async(req, res) => {
    try {
        const board = await models.board.findOne({ where : { id : req.params.boardId}, include : [
            { model : models.group, as : 'groups', where : { boardId : req.params.boardId }, include : [
               { model : models.task, as : 'tasks' }
            ]},
        ]});
        res.send(board);
    } catch(err) {
        logger.log('error',`Errror getting board ${err}`);
        throw Error(err);
    }
};

/**
* Creates new Board
*/
const addBoard = async(req, res, next) => {
    const folderId = req.body.folderId || null;
    try {
        req.board = await models.board.create({ label : req.body.label, folderId});
        return next();
    } catch(err) {
        logger.log('error',`Errror adding new board ${err}`);
        throw Error(err);
    }
};

/*
 *Given a teammemberId, the function adds the member to the board
*/
const addBoardTeammember = async(req, res) => {
    let member;
    try {
        member = await models.teammember.findByPk(req.teammemberId);
    } catch(err) {
        logger.log('error',`Error finding logged user id. ${err}`);
        throw Error(err);
    }

    try {
        await req.board.setTeammembers(member, {});
        res.status(201).send({message : "Added a new Board"});
    } catch(err) {
        logger.log('error',`Errror adding teammember to board ${err}`);
        throw Error(err);
    }
};

/**
* Finds all the Teammembers of specific board
*/
const getBoardTeammembers = async(req, res) => {
    try {
        const members = await models.board.findByPk(req.params.boardId, { include : [
            { model : models.teammember, as : 'teammembers', attributes : { exclude : ['password']}, 
            through: { attributes: [] }}
        ]}); 
        res.send(members);
    } catch(err) {
        logger.log('error',`Errror getting teammembers of board ${err}`);
        throw Error(err);
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
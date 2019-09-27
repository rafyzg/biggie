const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');
const { getSequelize } = require('../../../infrastructure/db');

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
        throw Error(err);
    }
};
/*
* Checks with a given boardId and given teammemberId if the user is a member in this board
*/
const isBoardMember = async(req, res, next) => {
    try {
        const sequelize = await getSequelize();
        const isMember = await sequelize.query('SELECT * FROM board_teammember WHERE "boardId" = (:boardId) AND "teammemberId" = (:teammemberId)',{
            replacements : { boardId : req.params.boardId, teammemberId : req.teammemberId},
            type: sequelize.QueryTypes.SELECT });
        if(!isMember.length) {
            res.statusCode = 401;
            res.send({ error : "Didn't find this board"});
        }
        return next();
    } catch(err) {
        throw Error(err);
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
        throw Error(err);
    }
};

/**
* Creates new Board
*/
const addBoard = async(req, res, next) => {
    try {
        let label = req.body.label;
        let folderId = req.body.folderId || null;
        req.board = await models.board.create({label, folderId});
        return next();
    } catch(err) {
        throw Error(err);
    }
};

/*
 *Given a teammemberId, the function adds the member to the board
*/
const addBoardTeammember = async(req, res) => {
    try {
        const member = await models.teammember.findByPk(req.teammemberId);
        await req.board.setTeammembers(member, {});
        res.status(201).send({message : "Added a new Board"});
    } catch(err) {
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
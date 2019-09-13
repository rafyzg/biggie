const { models, getSequelize } = require('./')

/**
* Finds all the Folders of specific Team member
* @param {int} teammemberId id of the wanted teammember
* @return {Promise} promise, with json response
*/
const getFolders = async(teammemberId) => {
    try {
        return await model.folder.findAll({ where : { teammemberId : teammemberId} });
    } catch(err) {
        throw Error(err);
    }
};

/**
* Adds folder to folders table with corresponding given information
* @param {json} request post body request
* @return Nothing.
*/
const addFolder = async(request) => {
    try {
        models.folder.create({ label : request.label, teammemberId : request.id});
    } catch(err) {
        throw Error(err);
    }
}

/**
* Finds all the boards of specific Team member
* @param {int} teammemberId id of the wanted teammember
* @return {JSON} Json object with board detailss
*/
const getBoards = async(teammemberId) => {
    try {
        const teammember = await getTeamMember(teammemberId);
        return await teammember.getBoards();
    } catch(err) {
        throw Error(err);
    }
};

/**
* Creates new Board
* @param {JSON} board Details of the new Board
* @return Nothing.
*/
const addBoard = async(board) => {
    try {
        const board = await models.board.create({ label : request.label, folderId: request.folder});
        const member = await getTeamMember(board.teammemberId);
        board.setTeammembers(member, {});
    } catch(err) {
        throw Error(err);
    }
}

/**
* Gets Teammember info by id
* @param {int} teammemberId id of the wanted teammember
* @return {JSON} Json object, with Teammember's data
*/
const getTeamMember = async(teammemberId) => {
    try {
        return await models.teammember.findByPk(teammemberId);
    } catch(err) {
        throw Error(err);
    }
};

/**
* Finds Teammember by email
* @param {string} emailAddress email of the wanted Teammember
* @return {JSON} json, with Teammember's data
*/
const getTeammemberByEmail = async(emailAddress) => {
    try {
        return await models.teammember.findOne({ where : { emailAddress : emailAddress}});
    } catch (err) {
        throw Error(err);
    }
}
/**
* Creates Teammember
* @param {JSON} member Details of the new members
* @return Nothing.
*/
const createTeamMemeber = async(member) => {
    models.teammember.create({ emailAddress : member.emailAddress, 
        password : member.password });

}

/**
* Finds all the Teammembers of specific board
* @param {int} boardId id of the wanted board
* @return {JSON} json, with board's teammembers details
*/
const getBoardTeammembers = async(boardId) => {
    try {
        const board = await getBoard(boardId);
        if(board != null) {
            return await board.getTeammembers();
        } else {
            return [];
        }
    } catch(err) {
        throw Error(err);
    }
}
/**
* Finds all the Groups of specific board
* @param {int} boardId id of the wanted board
* @return {JSON} json with all groups of requested board
*/
const getGroups = async(boardId) => {
    try {
        return await models.group.findAll({ where : { boardId : boardId } });
    } catch(err) {
        throw Error(err);
    }
}

/**
* Checks if a Teammember is a member of a certain board
* @param {int} boardId id of the wanted board
* @param2 {int} teammemberId id of the wanted teammember
* @return {Boolean} True - if a member of the board, else False
*/
const isBoardTeammember = async(boardId, teammemberId) => {
    const sequelize = await getSequelize();
    const isMember = await sequelize.query('SELECT * FROM board_teammember WHERE "boardId" = (:boardId) AND "teammemberId" = (:teammemberId)',{
        replacements : { boardId : boardId, teammemberId : teammemberId},
        type: sequelize.QueryTypes.SELECT });
    if(isMember.length == 0) {
        return false;
    }
    return true;
}


/**
* Add group to a specific board
* @param {JSON} group , json with values of the needed fields
* @return Nothing
*/
const addGroup = async(group) => {
    try {
        await models.group.create({ label : group.label, boardId : group.boardId });
    } catch(err) {
        throw Error(err);
    }
}
/**
* Finds all the Tasks of specific group
* @param {int} groupId id of the wanted group
* @return {JSON} Json, that contains all tasks of requested  group
*/
const getGroupTasks = async(groupId) => {
    try {
        return await models.task.findAll({ where : {groupId : groupId}});
    } catch(err) {
        throw Error(err);
    }
}
/**
* Find board instance by boardId
* @param {int} boardId id of the wanted board
* @return {JSON} Json, that contains data of the requested group
*/
const getBoard = async(boardId) => {
    try {
        return await models.board.findByPk(boardId);
    } catch(err) {
        throw Error(err);
    }
};
/**
* Add task to a specific group, with a teammemberId
* @param {JSON} task , json with values of the needed fields
* @return Nothing
*/
const addTask = async(task) => {
    try {
        models.task.create({ label : task.label, status : 'unfinished', 
            metadata : task.metadata, teammemberId : task.teammemberId,
            groupId : task.groupId });
    } catch (err) {
        throw Error(err);
    }
}


module.exports = {
    getFolders,
    getTeammemberByEmail,
    getBoards,
    getBoard,
    getBoardTeammembers,
    isBoardTeammember,
    getGroupTasks,
    getGroups,
    addFolder,
    addGroup,
    addTask,
    addBoard,
    createTeamMemeber
};
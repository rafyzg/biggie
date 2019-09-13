const { models } = require('../../infrastructure/db');
const handler = require('../../infrastructure/db/handler');

const getFoldersJson = async(req, res) => {
    const folders = await handler.getFolders(req.teammemberId);

    let resp = { folders : new Array() };
    for(let i = 0; i < folders.length;i++) {
        resp.folders[i] = {
            id : folders[i].id,
            label : folders[i].label
        }
    }

    res.status(200).send(resp);
};

const getTeammemberJson = async(req, res) => {
    const teammember = await handler.getTeammemberByEmail(req.params.teamMemberEmail);

    if(teammember != null) {
        let resp = {
            id : teammember.id,
            emailAddress : teammember.emailAddress,
            createdAt : teammember.createdAt,
            updatedAt : teammember.updatedAt
        }
        res.status(200).send(resp);
    } else {
        res.status(200).send({ error : "Couldn't find teammember with this email"});
    }
};

const getBoardsJson = async(req, res) => {
    const boards = await handler.getBoards(req.teammemberId);

    let resp = {
        boards : new Array()
    }
    for(let i = 0; i < boards.length;i++) {
        resp.boards[i] = {
            id : boards[i].id,
            label : boards[i].label
        }
    }
    res.status(200).send(resp)
};

const getBoardsTeammembersJson = async(req, res) => {
    const teamMembers = await handler.getBoardTeammembers(req.params.boardId);

    let resp = { Teammembers : new Array() };
    for(let i = 0; i < teamMembers.length; i++) {
        resp.Teammembers[i] = {
            id : teamMembers[i].id,
            emailAddress : teamMembers[i].emailAddress,
            createdAt : teamMembers[i].createdAt,
            updatedAt : teamMembers[i].updatedAt
        }
    }

    res.send(resp);
}

const getBoardJson = async(req, res) => {
    const isMember = await handler.isBoardTeammember(req.params.boardId, req.teammemberId);
    if(!isMember) {
        res.send({ error : "You are not a member in this board"});
    } else {
        const board = await handler.getBoard(req.params.boardId); //gets board data
        let resp = { id : board.id, label : board.label, createdAt: board.createdAt, groups : new Array() };
        const groups = await handler.getGroups(req.params.boardId); //gets all groups data
        for(let i = 0; i < groups.length; i++) {

            const tasks = await handler.getGroupTasks(groups[i].id); //gets all group tasks data
            resp.groups[i] = { id : groups[i].id, label : groups[i].label, tasks : new Array()};

            for(let j = 0; j < tasks.length; j++) {
                resp.groups[i].tasks[j] = {
                    id : tasks[i].id,
                    label : tasks[i].label,
                    status : tasks[i].status,
                    metadata : tasks[i].metadata
                }
            }
        }
        res.send(resp);
    }
}

module.exports = {
    getFoldersJson,
    getTeammemberJson,
    getBoardsJson,
    getBoardsTeammembersJson,
    getBoardJson
};
let biggie = require('express').Router();
const { folder, board, group, task, teammember } = require('./handlers');
const {boardRules, validateRequest, isBoardMember} = require('./middleware/board');
const { groupRules, getGroupBoardId} = require('./middleware/group');
const { folderRules } = require('./middleware/folder');
const { taskRules } = require('./middleware/task');

biggie.post('/folders', [folderRules, validateRequest, folder.addFolder]); //Creating a new folder
biggie.post('/boards', [boardRules, validateRequest, board.addBoard]); //Creating a new board
biggie.post('/groups', [groupRules, validateRequest, group.addGroup]); //Creating a new group in board
biggie.post('boards/groups/task', [taskRules, validateRequest, task.addTask]); //Creating a new task inside specific group, and board

biggie.get('/folders', [folder.getFolders]); //Gets all folders of logged user
biggie.get('/boards', [board.getBoards]); //Gets all boards of logged user
biggie.get('/groups/:groupId', [getGroupBoardId, isBoardMember, group.getGroup]); //Get group's data
biggie.get('/teammembers/:teamMemberEmail', [teammember.getTeammemberByEmail]); //Finds teammember by email
biggie.get('/me', [teammember.getTeammember]); //Gets data of the logged user

biggie.use('/boards/:boardId', [isBoardMember]); //Checks if teammember is a member in specified board
biggie.get('/boards/:boardId', [board.getBoard]); //Gets all teammembers of specific board
biggie.get('/boards/:boardId/teammembers', [board.getBoardTeammembers]); //Gets all teammembers of specific board
biggie.get('/boards/:boardId/groups/:groupId/tasks/:taskId', [task.getTask]); //Get task info

module.exports = {
    biggie
};

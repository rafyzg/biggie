const express = require('express');
const { folder, board, group, task, teammember } = require('./handlers');
const { initDb } = require('../../infrastructure/db/');
const auth = require('./validator');
const app = express();
const port = 5867;
initDb();
app.use(express.json());
app.use(auth.validateToken); //Validating user token

//app.post('/login', [auth.verifyLogin, auth.login]);
app.post('/api/v1/boards', [board.addBoard, board.addBoardTeammember]); //Creating a new board
app.post('/api/v1/groups',[group.addGroup]); //Creating a new group in board
app.post('/api/v1/folders', [folder.addFolder]); //Creating a new folder
app.post('/api/v1/boards/group/task',[task.addTask]); //Creating a new task inside specific group, and board

app.get('/api/v1/boards', [board.getBoards]); //Gets all boards of logged user
app.get('/api/v1/boards/:boardId', [board.isBoardMember, board.getBoard]); //Gets data of a requested board
app.get('/api/v1/boards/:boardId/teammembers', [board.isBoardMember, board.getBoardTeammembers]); //Gets all teammembers of specific board
app.get('/api/v1/groups/:groupId', [group.getGroupBoardId, board.isBoardMember, group.getGroup]); //For getting group info
app.get('/api/v1/boards/:boardId/groups/:groupId/tasks/:taskId',[board.isBoardMember, task.getTask]); //Get task info
app.get('/api/v1/teammembers/:teamMemberEmail',[teammember.getTeammemberByEmail]); //Finds teammember by email
app.get('/api/v1/me', [teammember.getTeammember]); //Gets data of the logged user 
app.get('/api/v1/folders', [folder.getFolders]); //Gets all folders of the logged user

app.listen(port, () => console.log(`Biggie app listening on port ${port}!`))
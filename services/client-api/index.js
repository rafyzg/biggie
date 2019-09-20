const express = require('express');
const { folder, board, group, task, teammember } = require('./handlers');
const { initDb } = require('../../infrastructure/db/');
const auth = require('../auth-api/verifyUserMiddleware');
const app = express();
const port = 5867;
initDb();
app.use(express.json());
app.use(auth.validateMember); //Validating user token

app.post('/login', [auth.verifyLogin, auth.login]);
app.post('/boards', [board.addBoard, board.addBoardTeammember]); //Creating a new board
app.post('/groups',[group.addGroup]); //Creating a new group in board
app.post('/folders', [folder.addFolder]); //Creating a new folder
app.post('/boards/group/task',[task.addTask]); //Creating a new task inside specific group, and board

app.get('/boards', [board.getBoards]); //Gets all boards of logged user
app.get('/boards/:boardId', [board.isBoardMember, board.getBoard]); //Gets data of a requested board
app.get('/boards/:boardId/teammembers', [board.isBoardMember, board.getBoardTeammembers]); //Gets all teammembers of specific board
app.get('/teammembers/:teamMemberEmail',[teammember.getTeammemberByEmail]); //Finds teammember by email
app.get('/teammember', [teammember.getTeammember]); //Gets data of the logged user 
app.get('/folders', [folder.getFolders]); //Gets all folders of the logged user

app.listen(port, () => console.log(`Biggie app listening on port ${port}!`))
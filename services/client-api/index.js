const express = require('express');
const responseBuilder = require('./responseBuilder');
const { initDb } = require('../../infrastructure/db/');
const auth = require('../auth-api/verifyUserMiddleware');
const app = express()
const port = 5867;
initDb();
app.use(express.json());
app.use(auth.validateMember); //Validating user token

app.post('/login', [auth.verifyLogin, auth.login]);
app.post('/folders', [responseBuilder.addFolder]); //Creating a new folder
app.post('/boards', [responseBuilder.addBoard]); //Creating a new board
app.post('/groups',[responseBuilder.addGroup]); //Creating a new group in board
app.post('/boards/:groupId/task',[responseBuilder.addTask]); //Creating a new task inside specific group, and board

app.get('/folders', [responseBuilder.getFoldersJson]); //Gets all folders of logged user
app.get('/teamMembers/:teamMemberEmail',[responseBuilder.getTeammemberJson]); //Finds teammember by email
app.get('/boards', [responseBuilder.getBoardsJson]); //Gets all boards of logged user
app.get('/boards/:boardId', [responseBuilder.getBoardJson]); //Gets data of a requested board
app.get('/boards/:boardId/teammembers', [responseBuilder.getBoardsTeammembersJson]); //Gets all teammembers of specific board

app.listen(port, () => console.log(`Biggie app listening on port ${port}!`))
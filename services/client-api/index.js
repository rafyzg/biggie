const express = require('express');
const handler = require('../../infrastructure/db/handler.js');
const responseBuilder = require('./responseBuilder');
const { initDb } = require('../../infrastructure/db/');
const logger = require('../../infrastructure/logging/logger.js')
const auth = require('../auth-api/verifyUserMiddleware');
const app = express()
const port = 5867;
initDb();
app.use(express.json());

app.post('/login', [auth.verifyLogin,
    auth.login]);

app.get('/folders', [auth.validateToken, responseBuilder.getFoldersJson]);
app.get('/teamMembers/:teamMemberEmail',[ auth.validateToken, responseBuilder.getTeammemberJson]);
app.get('/boards', [auth.validateToken, responseBuilder.getBoardsJson]);
app.get('/boards/:boardId', [auth.validateToken, responseBuilder.getBoardJson]);
app.get('/boards/:boardId/teammembers', [auth.validateToken, responseBuilder.getBoardsTeammembersJson]);

app.post('/folders',[auth.validateToken], (req,res) => {
    handler.addFolder({label : req.body.label, teammemberId : req.teammemberId});
    res.send("Added a new folder");
    logger.info("Added a new folder");
});
app.post('/boards', [auth.validateToken],(req, res) => {
    handler.addBoard({ teammemberId : req.teammemberId, label : req.body.label, folderId: req.body.folderId }).then(() => {
        res.send("Added a new board");
        logger.info("Added a new board");
    });
});

app.post('/groups',[auth.validateToken], (req, res) => {
    handler.addGroup({ boardId : req.body.boardId, label : req.body.label });
    res.send("Addeed a new group");
    logger.info("Added a new group");
});

app.post('/boards/:groupId/task',[auth.validateToken], (req, res) => {
    handler.addTask({ label : req.body.label, metadata : req.body.metadata, teammemberId : req.teammemberId, groupId : req.params.groupId });
    logger.info("Added a new task");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
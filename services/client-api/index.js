const express = require('express');
const handler = require('../../infrastructure/db/handler.js');
const { initDb } = require('../../infrastructure/db/');
const logger = require('../../infrastructure/logging/logger.js')
const app = express()
const port = 5867;
initDb();

app.route('/boards')
    .get((req,res) => {
        let id = req.params.id || 1;
        handler.getBoards(id).then((boards) => {
            res.send(boards);
            logger.logger.info("GET request");
        });
    })
    .post((req, res) => {
        handler.addBoard({ id : req.body.id, label : req.body.label, folderId: req.body.folderId }).then(() => {
            res.send("Added a new board");
            logger.info("Added a new board");
        });
    })

app.get('/boards/:boardId', (req, res) => {
    handler.getBoard({ boardId : req.params.boardId }).then((board) => {
        res.send(board);
    });
});

app.post('/boards/:groupId/task', (req, res) => {
    handler.addTask({ label : req.body.label, metadata : req.body.metadata, teammemberId : req.body.teammemberId, groupId : req.params.groupId });
    logger.info("Added a new task");
});

app.get('/boards/:boardId/teamMembers', (req, res) => {
    handler.getBoardTeammembers(req.params.boardId).then(teammembers => {
        res.send(teammembers);
    });
});

app.post('/folders', (req,res) => {
    handler.addFolder({ id : req.body.id, label : req.body.label });
    res.send("Added a new folder");
    logger.info("Added a new folder");
});

app.post('/groups', (req, res) => {
    handler.addGroup({ boardId : req.body.boardId, label : req.body.label });
    res.send("Addeed a new group");
    logger.info("Added a new group");
});

app.get('/teamMembers/:teamMemberId', (req,res) => {
    handler.getTeamMember(req.teammemberId).then(teamMember => {
        res.send(teamMember);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
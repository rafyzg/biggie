const { models } = require('../../../infrastructure/db');

/**
* Finds all the folders of the logged teammember
* @param {*} req express request
* @param {*} res express response
*/
const getFolders = async(req, res) => {
    try {
        let folders = await models.folder.findAll({ where : { teammemberId : req.teammemberId} });
        res.send(folders);
    } catch(err) {
        throw Error(err);
    }
};

/**
* Creates a new folder for the logges teammember
*/
const addFolder = async(req, res, next) => {
    try {
        let folder = await models.folder.create({ label : req.body.label, teammemberId : req.teammemberId})
        req.folderId = req.folderId;
        res.send("Successfully created a new folder");
    } catch(err) {
        throw Error(err);
    }
};
/**
* Adds requested board to folder
*/
const addBoardtoFolder = async(req, res) => {
    if(!req.boards) {
        res.send("Successfully created a new folder");
    }

};

module.exports = {
    getFolders,
    addFolder
}
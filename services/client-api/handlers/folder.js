const { models } = require('../../../infrastructure/db');

/**
* Finds all the folders of the logged teammember
* @param {*} req express request
* @param {*} res express response
*/
const getFolders = async(req, res) => {
    try {
        const folders = await models.folder.findAll({ where : { teammemberId : req.teammemberId} });
        res.send(folders);
    } catch(err) {
        logger.log('error',`Errror getting teammember folders ${req.teammemberId} ${err}`);
        throw Error(err);
    }
};
/**
* Creates a new folder for the logges teammember
*/
const addFolder = async(req, res, next) => {
    try {
        const folder = await models.folder.create({ label : req.body.label, teammemberId : req.teammemberId})
        req.folderId = folder.id;
        res.send("Successfully created a new folder");
    } catch(err) {
        logger.log('error',`Errror adding folder ${err}`);
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
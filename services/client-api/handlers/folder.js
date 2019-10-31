const { models } = require('../../../infrastructure/db');
const logger = require('../../../infrastructure/logging/logger');

/**
* Finds all the folders of the logged teammember
* @param {*} req express request
* @param {*} res express response
*/
const getFolders = async(req, res) => {
    let folders;
    try {
        folders = await models.folder.findAll({ where : 
            { teammemberId : req.teammemberId } 
        });
        res.send(folders);
    } catch(err) {
        logger.log('error',`Errror finding folders -  ${err}`);
        res.staus(500).json({ 'error' : "can't find teammember's folder"})
    }
};
/**
* Creates a new folder for the logges teammember
*/
const addFolder = async(req, res) => {
    let folder;
    try {
        folder = await models.folder.create({ label : req.body.label, teammemberId : req.teammemberId})
        res.status(201).send(folder);
    } catch(err) {
        logger.log('error',`Errror adding folder ${err}`);
        res.status(500).json({ 'error' : `cant' add folder`})
    }
};

module.exports = {
    getFolders,
    addFolder
}
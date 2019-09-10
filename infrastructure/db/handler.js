const { models, initDb } = require('./')

/**
* Finds all the Folders of specific Team member
* @param {int} teammemeberId id of the wanted teammember
* @return {Promise} promise, with json response
*/
exports.getFolders = async(teammemeberId) => {

    return new Promise((resolve) => {

        models.folder.findAll({ where : { teammemeberId : teammemeberId} }).then(folders => {

            let resp = { folders : new Array() };
            for(let i = 0; i < folders.length;i++) {
                resp.folders[i] = {
                    id : folders[i].id,
                    label : folders[i].label
                }
            }
            resolve(resp);

        });

    });
}

/**
* Adds folder to folders table with corresponding given information
* @param {json} request post body request
* @return Nothing
*/
exports.addFolder = async(request) => {
    models.folder.create({ label : request.label, teammemberId : request.id});
}

/**
* Finds all the boards of specific Team member
* @param {int} teammemeberId id of the wanted teammember
* @return {Promise} promise, with json response
*/
exports.getBoards = async (teammemeberId) => {

    return new Promise((resolve) =>  {
        models.teammember.findByPk(teammemeberId).then(user => {
        
            user.getBoards().then(boards => {
                let response = {
                    boards : new Array()
                }
                for(let i = 0; i < boards.length;i++) {
                    response.boards[i] = {
                        id : boards[i].id,
                        label : boards[i].label
                    }
                }

                resolve(response);

            });
        });
    });
}

exports.addBoard = async(request) => {

    models.teammember.findByPk(request.id).then(user => {
        models.board.create({ label : request.label, folderId: request.folder}).then(board => {
            board.setTeammembers(user, {});
        });
    });
    
}

/**
* Gets all the information about specific Teammember
* @param {int} teammemeberId id of the wanted teammember
* @return {Promise} promise, with json response
*/
exports.getTeamMember = async(teammemberId) => {

    return new Promise((resolve) => {
        models.teammember.findByPk(teammemberId).then(user => {
            let resp;
            if(user != null) {
                resp = {
                    id : user.id,
                    emailAddress : user.emailAddress,
                    createdAt : user.createdAt,
                    updatedAt : user.updatedAt
                }
            }
            else {
                resp = {
                    error : "Couldn't find id of " + request.teamMemberId + " in teammembers",
                }
            }
            resolve(resp);
        });
    });
}

exports.addTeamMemeber = async(request) => {
    models.teammember.create({ emailAddress : request.emailAddress, 
        password : request.password });

}

/**
* Finds all the Teammembers of specific board
* @param {int} boardId id of the wanted board
* @return {Promise} promise, with json response
*/
exports.getBoardTeammembers = async(boardId) => {
    
    return new Promise((resolve) => {

        models.board.findByPk(boardId).then((board) => {
            board.getTeammembers().then(users => {

                let resp = { Teammembers : new Array() };
                for(let i = 0;i < users.length;i++) {
                    resp.Teammembers[i] = {
                        id : users[i].id,
                        emailAddress : users[i].emailAddress,
                        createdAt : users[i].createdAt,
                        updatedAt : users[i].updatedAt
                    }
                }
                resolve(resp);

            });
        });

    });
}
/**
* Finds all the Groups of specific board
* @param {int} boardId id of the wanted board
* @return {Promise} promise, with json response
*/
exports.getGroups = async(boardId) => {

    return new Promise((resolve) => {

        models.group.findAll({ where : { boardId : boardId } }).then(groups => {

            let resp = { groups : new Array() }; //Builds array of all the groups
            for(let i = 0;i < groups.length;i++) {
                resp.groups[i] = {
                    id : groups[i].id,
                    label : groups[i].label,
                    updatedAt : groups[i].updatedAt
                }
            }
            resolve(resp);

        });
    });
}

exports.addGroup = async(request) => {

    models.group.create({ label : request.label, boardId : request.boardId });

}
/**
* Finds all the Tasks of specific group
* @param {int} groupId id of the wanted group
* @return {Promise} promise, with json response
*/
exports.getGroupTasks = async(groupId) => {

    return new Promise((resolve) => {

        models.group.findByPk(groupId).then((group) => {
            group.getTasks().then((tasks) => {

                let resp = { tasks : new Array() }
                for(let i = 0; i < tasks.length; i++) {

                    resp.tasks[i] = {
                        id : tasks[i].id,
                        label : tasks[i].label,
                        status : tasks[i].status,
                        metadata : tasks[i].metadata
                    }
                }

                resolve(resp);
            });
        });
    });
}
/**
* Finds all information(groups and tasks and related teammembers) of specific board
* @param {int} request information of the request
* @return {Promise} promise, with json response
*/
exports.getBoard = async(request) => {

    var response = {};
    getBoardTeammembers(request.boardId).then((board) => {
        response.teammembers = board.Teammembers;

        getGroups(request.boardId).then((groups) => {

            response.groups = groups.groups;
            response.tasks = new Array();
            for(let i = 0; i < groups.groups.length; i++) {
                response.tasks[i] = {
                    groupId : groups.groups[i].id,
                    tasks : new Array()
                }
                //response.tasks[i] = new Array();
                let groupId = groups.groups[i].id;
                getGroupTasks(groupId).then((tasks) => {

                    console.log(tasks.tasks);
                    response.tasks[i].tasks = tasks.tasks.slice();
                    //response.tasks.tasks = tasks.tasks;
                    //response.tasks.push(tasks);
                    console.log(response);

                });
            }
        });
    });
}

exports.addTask = async(request) => {
    
    models.task.create({ label : request.label, status : 'unfinished', 
        metadata : request.metadata, teammemeberId : request.teammemberId,
        groupId : request.groupId });
}

/*const main = async () => {
    const request = {
        boardId : 1,
        groupId : 1
    };

    await getBoard(request);

    //await addFolder(request);
    //const resp = await getFolders(request);
    /*getFolders(request).then(resp => {
        console.log(resp);
    });
}

main();*/
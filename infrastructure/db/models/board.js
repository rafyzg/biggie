module.exports = function buildBoard(sequelize, DataTypes) {
    const board = sequelize.define('board', {
        label: { type: DataTypes.STRING, allowNull: false }
    });

    board.associate = models => {
        board.groups = board.hasMany(models.group, {
            as: 'groups'
        });
        //Will be board.getGroups()
        
        board.teamMembers = board.belongsToMany(models.teammember, { 
            through: 'board_teammember',
            foreignKey: 'boardId'
        });

        /*board.folder = board.belongsTo(models.folder, {
            as: 'folder',
            foreignKey: { name: 'folderId', allowNull: true },
        }); */
        //Will be board.getFolder()
    };

    return board;
};

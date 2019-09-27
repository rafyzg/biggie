module.exports = function buildFroup(sequelize, DataTypes) {
    const folder = sequelize.define('folder', {
        label: { type: DataTypes.STRING, allowNull: false }
    });

    folder.associate = models => {
        folder.boards = folder.hasMany(models.board, {
            as: 'boards'
        });
    };
    //will be folder.getBoards()

    return folder;
};

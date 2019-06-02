module.exports = function buildBoard(sequelize, DataTypes) {
    const board = sequelize.define('board', {
        label: { type: DataTypes.STRING, allowNull: false },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.group,
                key: 'id',
            },
            unique: 'externalIdGroupUnique',
        },
    });

    board.associate = models => {
        // TBN: inner assumption that if a group id set, the board belongs to a specified folder
        // other boards could belong to the same folder (groupId)
        board.folder = board.belongsTo(models.group, {
            as: 'folder',
            foreignKey: { name: 'groupId', allowNull: false },
        });

        board.groups = board.hasMany(models.group, {
            as: 'group',
            foreignKey: { name: 'boardId', allowNull: false},
        });
    };

    return board;
};

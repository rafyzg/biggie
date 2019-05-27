module.exports = function buildGroup(sequelize, DataTypes) {
    // TBN: Internal assumption that group can be either a folder or a group of tasks
    // finding the proper type would be examining the 'kind' attribute
    // 'FOLDER' for a folder type
    // 'GROUP'  for a group of tasks type
    const group = sequelize.define('group', {
        name: { type: DataTypes.STRING, allowNull: false },
        kind: { type: DataTypes.STRING, allowNull: false },
    });

    group.associate = models => {
        group.board = group.belongsTo(models.board, {
            as: 'board',
            foreignKey: { name: 'groupId', allowNull: false },
        });
    };

    return group;
};
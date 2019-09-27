module.exports = function buildGroup(sequelize, DataTypes) {
    const group = sequelize.define('group', {
        label: { type: DataTypes.STRING, allowNull: false }
    });

    group.associate = models => {
        group.board = group.belongsTo(models.board, {
            as: 'board',
            foreignKey: { name: 'boardId', allowNull: false },
        });
        //Will be group.getBoard()

        group.tasks = group.hasMany(models.task, {
           as: 'tasks',
           foreignKey: { name: 'groupId', allowNull: false },
        });
        //will be group.getTasks()
    };

    return group;
};

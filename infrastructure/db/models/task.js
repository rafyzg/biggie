module.exports = function buildTask(sequelize, DataTypes) {
    const task = sequelize.define('task', {
        label: { type: DataTypes.STRING, allowNull: false },
        ownerId: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.teamMember,
                key: 'id',
            },
            unique: 'externalIdSTeamMemberUnique',
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.group,
                key: 'id',
            },
            unique: 'externalIdSGroupUnique',
        },
        status: { type: DataTypes.STRING, allowNull: false },
        metadata: { type: DataTypes.JSON, allowNull: false },
    });

    task.associate = models => {
        task.owner = task.belongsTo(models.teamMember, {
            as: 'teamMember',
            foreignKey: { name: 'ownerId', allowNull: false },
        });

        task.group = task.belongsTo(models.group, {
           as: 'group',
           foreignKey: { name: 'groupId', allowNull: false },
        });
    };

    return task;
};

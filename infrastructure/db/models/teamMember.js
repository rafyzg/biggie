module.exports = function buildTeamMember(sequelize, DataTypes) {
    const teamMember = sequelize.define('teamMember', {
        emailAddress: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    });

    teamMember.associate = models => {
        teamMember.tasks = group.belongsTo(models.task, {
            as: 'task',
            foreignKey: { name: 'OwnerId', allowNull: false },
        });
    };

    return group;
};

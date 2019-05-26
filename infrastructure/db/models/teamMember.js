module.exports = function buildTeamMember(sequelize, DataTypes) {
    const teamMember = sequelize.define('teamMember', {
        emailAddress: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    });

    teamMember.associate = models => {
        teamMember.tasks = teamMember.belongsTo(models.task, {
            as: 'task',
            foreignKey: { name: 'ownerId', allowNull: false },
        });
    };

    return teamMember;
};

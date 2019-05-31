module.exports = function buildTeamMember(sequelize, DataTypes) {
    const teamMember = sequelize.define('teammember', {
        emailAddress: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    });

    teamMember.associate = models => {
        teamMember.task = teamMember.hasMany(models.task, {
            as: 'task',
            foreignKey: { name: 'ownerId', allowNull: false },
        });
    };

    return teamMember;
};

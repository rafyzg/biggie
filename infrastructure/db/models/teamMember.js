module.exports = function buildTeamMember(sequelize, DataTypes) {
    const teammember = sequelize.define('teammember', {
        emailAddress: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    });

    teammember.associate = models => {
        teammember.task = teammember.hasMany(models.task, {
            as: 'tasks'
        });

        teammember.folders = teammember.hasMany(models.folder, {
            as: 'folders'
        });
        //Will be teammember.getFolder()
        
        teammember.boards = teammember.belongsToMany(models.board, {
            through: 'board_teammember',
            foreignKey: 'teammemberId'
        });
    };

    return teammember;
};

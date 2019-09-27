module.exports = function buildTask(sequelize, DataTypes) {
    const task = sequelize.define('task', {
        label: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        metadata: { type: DataTypes.JSON, allowNull: true },
    });

    task.associate = models => {
        task.teammember = task.belongsTo(models.teammember, {
            as: 'teammember',
            foreignKey: { name: 'teammemberId', allowNull: false },
        });
        //Will be task.getTeammember()

        task.group = task.belongsTo(models.group, {
           as: 'group',
           foreignKey: { name: 'groupId', allowNull: false },
        });
        //Will be task.getGroup()
    };

    return task;
};

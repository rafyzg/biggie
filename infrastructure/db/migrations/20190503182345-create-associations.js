module.exports = {
    up: (queryInterface, Sequelize) =>
        // Clinician Associations
        queryInterface
            .addColumn('board', 'groupId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'group',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            })
            .then(() =>
                queryInterface.addColumn('group', 'boardId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'board',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
            ).then(() =>
            queryInterface.addColumn('task', 'groupId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'group',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }),
        ).then(() =>
            queryInterface.addColumn('task', 'ownerId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'teammember',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }),
        ),

    down: queryInterface =>
    queryInterface
    .removeColumn('board', 'groupId')
    .then(() => queryInterface.removeColumn('group', 'boardId'))
    .then(() => queryInterface.removeColumn('task', 'groupId'))
    .then(() => queryInterface.removeColumn('task', 'ownerId')),
};
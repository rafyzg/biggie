'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('board_teammember', {
      boardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "boards",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teammemberId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "teammembers",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('board_teammember');
  }
};

'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'ru'),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}

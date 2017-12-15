'use strict'
module.exports = (sequelize, DataTypes) => {
  var Coupon = sequelize.define('Coupon', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Coupon
}
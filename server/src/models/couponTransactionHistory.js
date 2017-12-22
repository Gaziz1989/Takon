module.exports = (sequelize, DataTypes) => {
  const CouponTransactionHistory = sequelize.define('CouponTransactionHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    amount: DataTypes.INTEGER,
    summ: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  })
  CouponTransactionHistory.associate = function (models) {
    models.CouponTransactionHistory.belongsTo(models.User, { as: 'from' })
    models.CouponTransactionHistory.belongsTo(models.User, { as: 'to' })
    models.CouponTransactionHistory.belongsTo(models.Coupon, { as: 'coupon' })
  }
  return CouponTransactionHistory
}

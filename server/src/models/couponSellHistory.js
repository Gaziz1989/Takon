module.exports = (sequelize, DataTypes) => {
  const CouponSellHistory = sequelize.define('CouponSellHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    amount: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    summ: DataTypes.INTEGER
  })
  CouponSellHistory.associate = function (models) {
    models.CouponSellHistory.belongsTo(models.User, { as: 'owner' })
    models.CouponSellHistory.belongsTo(models.User, { as: 'organization' })
    models.CouponSellHistory.belongsTo(models.Coupon, { as: 'coupon' })
  }
  return CouponSellHistory
}

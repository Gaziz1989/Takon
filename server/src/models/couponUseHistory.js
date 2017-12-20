module.exports = (sequelize, DataTypes) => {
  const CouponUseHistory = sequelize.define('CouponUseHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    when: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    summ: DataTypes.INTEGER
  })
  CouponUseHistory.associate = function (models) {
    models.CouponUseHistory.belongsTo(models.User, { as: 'owner' })
    models.CouponUseHistory.belongsTo(models.User, { as: 'organization' })
    models.CouponUseHistory.belongsTo(models.User, { as: 'employee' })
    models.CouponUseHistory.belongsTo(models.Coupon, { as: 'coupon' })
  }
}

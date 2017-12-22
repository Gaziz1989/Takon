module.exports = (sequelize, DataTypes) => {
  const CouponCreation = sequelize.define('CouponCreation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    amount: DataTypes.INTEGER,
    summ: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.INTEGER
  })
  CouponCreation.associate = function (models) {
    models.CouponCreation.belongsTo(models.User, { as: 'who' })
    models.CouponCreation.belongsTo(models.Coupon, { as: 'coupon' })
  }
  return CouponCreation
}

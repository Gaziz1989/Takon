module.exports = (sequelize, DataTypes) => {
  const ReleasedCoupon = sequelize.define('ReleasedCoupon', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    }
  })
  ReleasedCoupon.associate = function (models) {
    ReleasedCoupon.belongsTo(models.Service)
    ReleasedCoupon.belongsTo(models.Coupon)
    ReleasedCoupon.belongsTo(models.User, { as: 'organization' })
    ReleasedCoupon.belongsTo(models.User, { as: 'owner' })
  }

  return ReleasedCoupon
}

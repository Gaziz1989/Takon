module.exports = (sequelize, DataTypes) => {
  const ReleasedCoupon = sequelize.define('ReleasedCoupon', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    amountofservices: DataTypes.INTEGER,
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
    ReleasedCoupon.belongsTo(models.Service, { as: 'service' })
    ReleasedCoupon.belongsTo(models.Coupon, { as: 'coupon' })
    ReleasedCoupon.belongsTo(models.User, { as: 'organization' })
    ReleasedCoupon.belongsTo(models.User, { as: 'owner' })
  }
  return ReleasedCoupon
}

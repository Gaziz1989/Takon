module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
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
    },
    endDate: DataTypes.INTEGER
  })
  Coupon.associate = function (models) {
    models.Coupon.belongsTo(models.Service)
    models.Coupon.belongsTo(models.User)
  }

  return Coupon
}

module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
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
      defaultValue: 'inactive'
    },
    endDate: DataTypes.INTEGER
  })
  Coupon.associate = function (models) {
    models.Coupon.belongsTo(models.Service, { as: 'service' })
    models.Coupon.belongsTo(models.User, { as: 'owner' })
  }
  return Coupon
}

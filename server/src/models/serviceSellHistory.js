module.exports = (sequelize, DataTypes) => {
  const ServiceSellHistory = sequelize.define('ServiceSellHistory', {
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
  ServiceSellHistory.associate = function (models) {
    models.ServiceSellHistory.belongsTo(models.User, { as: 'owner' })
    models.ServiceSellHistory.belongsTo(models.User, { as: 'organization' })
    models.ServiceSellHistory.belongsTo(models.Service, { as: 'service' })
  }
  return ServiceSellHistory
}

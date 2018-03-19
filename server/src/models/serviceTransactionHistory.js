module.exports = (sequelize, DataTypes) => {
  const ServiceTransactionHistory = sequelize.define('ServiceTransactionHistory', {
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
  ServiceTransactionHistory.associate = function (models) {
    models.ServiceTransactionHistory.belongsTo(models.User, { as: 'from' })
    models.ServiceTransactionHistory.belongsTo(models.User, { as: 'juser' })
    models.ServiceTransactionHistory.belongsTo(models.User, { as: 'to' })
    models.ServiceTransactionHistory.belongsTo(models.Service, { as: 'instance_service' })
    models.ServiceTransactionHistory.belongsTo(models.ReleasedService, { as: 'transfered_service' })
  }
  return ServiceTransactionHistory
}

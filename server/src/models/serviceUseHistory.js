module.exports = (sequelize, DataTypes) => {
  const ServiceUseHistory = sequelize.define('ServiceUseHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  })
  ServiceUseHistory.associate = function (models) {
    models.ServiceUseHistory.belongsTo(models.User, { as: 'owner' })
    models.ServiceUseHistory.belongsTo(models.User, { as: 'scaner' })
    models.ServiceUseHistory.belongsTo(models.User, { as: 'juser' })
    models.ServiceUseHistory.belongsTo(models.Service, { as: 'service' })
    models.ServiceUseHistory.belongsTo(models.ReleasedService, { as: 'takon' })
  }
  return ServiceUseHistory
}

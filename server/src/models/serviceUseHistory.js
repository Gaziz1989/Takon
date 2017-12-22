module.exports = (sequelize, DataTypes) => {
  const ServiceUseHistory = sequelize.define('ServiceUseHistory', {
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
  ServiceUseHistory.associate = function (models) {
    models.ServiceUseHistory.belongsTo(models.User, { as: 'owner' })
    models.ServiceUseHistory.belongsTo(models.User, { as: 'organization' })
    models.ServiceUseHistory.belongsTo(models.User, { as: 'employee' })
    models.ServiceUseHistory.belongsTo(models.Service, { as: 'service' })
  }
  return ServiceUseHistory
}

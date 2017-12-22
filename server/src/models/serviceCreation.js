module.exports = (sequelize, DataTypes) => {
  const ServiceCreation = sequelize.define('ServiceCreation', {
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
  ServiceCreation.associate = function (models) {
    models.ServiceCreation.belongsTo(models.User, { as: 'who' })
    models.ServiceCreation.belongsTo(models.Service, { as: 'service' })
  }
  return ServiceCreation
}

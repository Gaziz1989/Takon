module.exports = (sequelize, DataTypes) => {
  const ReleasedService = sequelize.define('ReleasedService', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    unit: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unapproved'
    }
  })
  ReleasedService.associate = function (models) {
    models.ReleasedService.belongsTo(models.User, { as: 'owner' })
    models.ReleasedService.belongsTo(models.Service, { as: 'service' })
  }
  return ReleasedService
}

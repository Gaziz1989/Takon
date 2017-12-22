module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
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
      defaultValue: 'inactive'
    }
  })
  Service.associate = function (models) {
    models.Service.belongsTo(models.User, { as: 'owner' })
  }
  return Service
}

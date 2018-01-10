module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
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
  Notification.associate = function (models) {
    models.Notification.belongsTo(models.User, { as: 'owner' })
    models.Notification.belongsTo(models.Service, { as: 'service' })
  }
  return Notification
}

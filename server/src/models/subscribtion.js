module.exports = (sequelize, DataTypes) => {
  const Subscribtion = sequelize.define('Subscribtion', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    }
  })
  Subscribtion.associate = function (models) {
    models.Subscribtion.belongsTo(models.User, { as: 'organization' })
    models.Subscribtion.belongsTo(models.User, { as: 'owner' })
  }
  return Subscribtion
}

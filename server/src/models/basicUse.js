module.exports = (sequelize, DataTypes) => {
  const BasicUse = sequelize.define('BasicUse', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    when: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    summ: DataTypes.INTEGER
  })
  BasicUse.associate = function (models) {
    models.BasicUse.belongsTo(models.User, { as: 'owner' })
    models.BasicUse.belongsTo(models.User, { as: 'organization' })
    models.BasicUse.belongsTo(models.User, { as: 'scanner' })
  }
  return BasicUse
}

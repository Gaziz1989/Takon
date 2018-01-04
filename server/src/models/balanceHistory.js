module.exports = (sequelize, DataTypes) => {
  const BalanceHistory = sequelize.define('BalanceHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: DataTypes.INTEGER,
    summ: DataTypes.INTEGER,
    initSumm: DataTypes.INTEGER
  })
  BalanceHistory.associate = function (models) {
    models.BalanceHistory.belongsTo(models.User, { as: 'to' })
    models.BalanceHistory.belongsTo(models.User, { as: 'from' })
  }
  return BalanceHistory
}

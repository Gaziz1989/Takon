module.exports = (sequelize, DataTypes) => {
  const Profit = sequelize.define('Profit', {
    date: DataTypes.INTEGER,
    summ: DataTypes.INTEGER,
    project: DataTypes.STRING // reference to project model
  })
  return Profit
}

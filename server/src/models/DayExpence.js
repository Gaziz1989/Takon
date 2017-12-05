module.exports = (sequelize, DataTypes) => {
  const DayExpence = sequelize.define('DayExpence', {
    date: DataTypes.INTEGER,
    summ: DataTypes.INTEGER,
    project: DataTypes.STRING // reference to project model
  })
  return DayExpence
}

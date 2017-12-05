module.exports = (sequelize, DataTypes) => {
  const Expence = sequelize.define('Expence', {
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return Expence
}

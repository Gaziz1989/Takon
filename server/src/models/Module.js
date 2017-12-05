module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    name: DataTypes.STRING,
    junSum: DataTypes.INTEGER,
    midSum: DataTypes.INTEGER,
    senSum: DataTypes.INTEGER,
    jundeadline: DataTypes.INTEGER,
    middeadline: DataTypes.INTEGER,
    sendeadline: DataTypes.INTEGER,
    type: DataTypes.STRING,
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return Module
}


module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    starttime: DataTypes.INTEGER,
    endtime: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    pausetime: DataTypes.INTEGER,
    employees: DataTypes.TEXT, // array of employees' id's
    dayexpences: DataTypes.TEXT, // array of day expences' id's
    trelloid: DataTypes.STRING,
    trellodonecards: DataTypes.TEXT, // array of donecards' id's
    trellotodocards: DataTypes.TEXT, // array of todocards' id's
    trelloboardname: DataTypes.STRING,
    notes: DataTypes.TEXT, // array of notes id's
    activeusers: DataTypes.INTEGER,
    amountofusers: DataTypes.INTEGER,
    profit: DataTypes.TEXT, // array of profits' id's
    techdata: DataTypes.STRING, // reference to techdata model
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return Project
}

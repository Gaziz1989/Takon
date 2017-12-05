module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    text: DataTypes.TEXT,
    employee: DataTypes.STRING, // reference to employee model
    project: DataTypes.STRING, // reference to project model
    date: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return Notes
}

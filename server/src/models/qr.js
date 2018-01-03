module.exports = (sequelize, DataTypes) => {
  const QR = sequelize.define('QR', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    qrstring: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    summ: DataTypes.INTEGER,
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
  QR.associate = function (models) {
    models.QR.belongsTo(models.User, { as: 'owner' })
    models.QR.belongsTo(models.User, { as: 'scanner' })
  }
  return QR
}

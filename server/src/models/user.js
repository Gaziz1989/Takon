const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    name: DataTypes.STRING,
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    adress: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: bcrypt.hashSync('123456789')
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
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    image: DataTypes.STRING,
    bio: DataTypes.TEXT
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  User.associate = function (models) {
    models.User.belongsTo(models.User, { as: 'employer' })
  }
  User.Instance.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}

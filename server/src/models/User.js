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
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
    birthday: DataTypes.INTEGER,
    entry: DataTypes.INTEGER,
    exit: DataTypes.INTEGER,
    projects: DataTypes.TEXT,
    role: DataTypes.STRING,
    front: DataTypes.STRING,
    back: DataTypes.STRING,
    ios: DataTypes.STRING,
    android: DataTypes.STRING,
    trellotoken: DataTypes.STRING,
    trelloname: DataTypes.STRING,
    salary: DataTypes.STRING,
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'employee'
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}


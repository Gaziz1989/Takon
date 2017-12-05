const { User } = require('../models')
// const jwt = require('jsonwebtoken')
// const config = require('../config/config')
const multiparty = require('multiparty')
const fs = require('fs')
// const Promise = require('bluebird')
// const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = {
  async getUser (req, res) {
    try {
      await User.findById(req.body.id).then(user => {
        res.send({
          user: user.toJSON()
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to post the image'
      })
    }
  },
  async changeimage (req, res) {
    try {
      const form = new multiparty.Form()
      await form.parse(req, function (err, fields, files) {
        if (err) {
          res.status(400).send({
            error: 'Error ocured when PARSE the file'
          })
        } else {
          var tempPath = files.imageFile[0].path
          var fileName = 'user-img/' + files.imageFile[0].originalFilename
          const copyToPath = 'static/user-img/' + files.imageFile[0].originalFilename
          fs.readFile(tempPath, function (err, data) {
            if (err) {
              res.status(400).send({
                error: 'Error ocured when READING the file'
              })
            } else {
              fs.writeFile(copyToPath, data, function (err) {
                if (err) {
                  res.status(400).send({
                    error: 'Error ocured when WRITING the file'
                  })
                } else {
                  User.findById(fields.userId[0]).then(user => {
                    user.image = fileName
                    user.save().then(() => {
                      fs.unlink(tempPath, function () {
                        res.send({
                          user: user.toJSON()
                        })
                      })
                    })
                  })
                }
              })
            }
          })
        }
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to post the image'
      })
    }
  },
  async editUser (req, res) {
    try {
      const _user = JSON.parse(req.body.user)
      const _password = JSON.parse(req.body.password)
      await User.findById(_user.id).then(user => {
        user.update({
          name: _user.name ? _user.name : user.name,
          lastname: _user.lastname ? _user.lastname : user.lastname,
          gender: _user.gender ? _user.gender : user.gender,
          phone: _user.phone ? _user.phone : user.phone,
          birthday: _user.birthday ? _user.birthday : user.birthday,
          entry: _user.entry ? _user.entry : user.entry,
          exit: _user.exit ? _user.exit : user.exit,
          role: _user.role ? _user.role : user.role,
          salary: _user.salary ? _user.salary : user.salary,
          trellotoken: _user.trellotoken ? _user.trellotoken : user.trellotoken,
          trelloname: _user.trelloname ? _user.trelloname.toLowerCase() : user.trelloname,
          email: _user.email ? _user.email : user.email,
          password: _password ? _password : user.password
        }, {
          where: {
            id: _user.id
          },
          individualHooks: true
        }).then(() => {
          res.send({
            user: user.toJSON()
          })
          // console.log(user)
        }).catch(error => {
          res.status(400).send({
            error: error
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to post the changes on user\'s profile'
      })
    }
  },
  async getUsers (req, res) {
    try {
      await User.findAll({
        where: {
          archived: false,
          type: 'employee'
        }
      }).then(users => {
        const _users = []
        users.map(function(user){
          _users.push(user.toJSON())
        })
        res.send({
          users: _users
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to read users in DB'
      })
    }
  },
  async archiveUser (req, res) {
    try {
      await User.findById(req.body.id).then(_user => {
        _user.archived = true
        _user.save().then(() => {
          res.send({
            user: _user.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при попытке архивации модуля в БД'
      })
    }
  }
}

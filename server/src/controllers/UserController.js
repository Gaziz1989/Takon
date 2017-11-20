const { User } = require('../models')
// const jwt = require('jsonwebtoken')
// const config = require('../config/config')
const multiparty = require('multiparty')
const fs = require('fs')

module.exports = {
  getUser (req, res) {
    try {
      User.findById(req.body.id).then(user => {
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
  changeimage (req, res) {
    try {
      const form = new multiparty.Form()
      form.parse(req, function (err, fields, files) {
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
  editUser (req, res) {
    try {
      const _user = JSON.parse(req.body.user)
      User.findById(_user.id).then(user => {
        user.name = _user.name ? _user.name : user.name
        user.lastname = _user.lastname ? _user.lastname : user.lastname
        user.gender = _user.gender ? _user.gender : user.gender
        user.phone = _user.phone ? _user.phone : user.phone
        user.birthday = _user.birthday ? _user.birthday : user.birthday
        user.entry = _user.entry ? _user.entry : user.entry
        user.exit = _user.exit ? _user.exit : user.exit
        user.role = _user.role ? _user.role : user.role
        user.trello = _user.trello ? _user.trello : user.trello
        user.email = _user.email ? _user.email : user.email
        user.password = _user.password ? _user.password : user.password
        user.save().then(() => {
          res.send({
            user: user.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to post the changes on user\'s profile'
      })
    }
  }
}

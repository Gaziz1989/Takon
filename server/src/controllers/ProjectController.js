const { Project } = require('../models')
const request  = require('request')
const { User } = require('../models')

function boardsMaping (_boards, _trellokey, _trellotoken) {
  return new Promise(function(resolve, reject){
    _boards.map(function(_board){
      const path = 'https://api.trello.com/1/boards/'+_board.id+'?fields=id,name,closed&lists=open&list_fields=id,name&members=all&member_fields=username,avatarHash,fullName&cards=open&card_fields=idList,name&key='+_trellokey+'&token='+_trellotoken
      request({
        method: 'GET',
        uri: path,
        json: true
      }, function(_error, response, board) {
        if (_error) {
          reject(_error)
        } else {
          Project.findOne({
            where: {trelloid: board.id}
          }).then(_project=>{
            if (!_project){
              const boardMembers = []
              new Promise(function(_resolve, _reject){
                board.members.map(function(member, index){
                  User.findOne({
                    where: {
                      trelloname: member.username.toLowerCase()
                    }
                  }).then(_user => {
                    if (_user) {
                      boardMembers.push(_user.id)
                      _resolve(boardMembers)
                    }
                  })
                })
              }).then(_boardMembers => {
                var doneCards = [];
                var toDoCards = [];

                var listDone;
                board.lists.map(function(list){
                  if(list.name.toLowerCase() === "done" || list.name.toLowerCase() ==="готово"){
                     listDone=list.id
                  }
                })

                board.cards.map(function (card){
                  if(card.idList === listDone){
                    doneCards.push(card.id)
                  } else{
                    toDoCards.push(card.id)
                  }
                })
                const data = {
                  name: board.name,
                  trelloid: board.id,
                  employees: _boardMembers.join(','),
                  trelloboardname: board.name ,
                  trellodonecards: doneCards.join(),
                  trellotodocards: toDoCards.join()
                }
                const newProject = Project.create(data)
                resolve(newProject)
              })
            } else {
              const boardMembers = []
              new Promise(function(_resolve, _reject){
                board.members.map(function(member, index){
                  User.findOne({
                    where: {
                      trelloname: member.username.toLowerCase()
                    }
                  }).then(_user => {
                    if (_user) {
                      boardMembers.push(_user.id)
                      _resolve(boardMembers)
                    }
                  })
                })
              }).then(_boardMembers => {
                var doneCards = [];
                var toDoCards = [];

                var listDone;
                board.lists.map(function(list){
                  if(list.name.toLowerCase() === "done" || list.name.toLowerCase() ==="готово"){
                     listDone=list.id
                  }
                })
                board.cards.map(function (card){
                  if(card.idList === listDone){
                    doneCards.push(card.id)
                  } else{
                    toDoCards.push(card.id)
                  }
                })
                const data = {
                  name: board.name,
                  trelloid: board.id,
                  employees: _boardMembers.join(','),
                  trelloboardname: board.name ,
                  trellodonecards: doneCards.join(),
                  trellotodocards: toDoCards.join()
                }
                _project.update(data).then(() => {
                  resolve(_project)
                }) 
              })
            }
          })
        }
      })
    })
  })
}

module.exports = {
  async trelloSync (req, res) {
    try{
      const trellokey = '875a0a661bf9eeb69f95110a7208a4c2'
      await User.findAll({
        where: {
          type: 'admin',
          archived: false
        }
      }).then(_admins => {
          _admins.map(function(_admin){
            if(_admin && _admin.trellotoken) {
              var path = 'https://api.trello.com/1/members/me?boards=all&board_fields=name&key='+trellokey+'&token='+_admin.trellotoken
              request({
                method: 'GET',
                uri: path,
                json: true
              }, function(_error, response, body) {
                if (_error) {
                  res.status(400).send({
                    error: _error
                  })
                } else {
                  boardsMaping(body.boards, trellokey, _admin.trellotoken)
                  .then(result => {
                    console.log(result.toJSON())
                    res.send({
                      message: 'Проекты успешно синхронизованы!'
                    })
                  }).catch(error => {
                    res.status(400).send({
                      error: 'Проекты не синхронизованы!'
                    })
                  })
                }
              })
            } else {
              res.status(400).send({
                error: 'Вы не ввели токен для Трелло!'
              })
            }
          })
        })
    } catch (error) {
      res.status(500).send({
        error: 'Ошибка произошла при синхронизации с Трелло'
      })
    }
  },
  async getProjects (req, res) {
    try {
      const project = await 
    } catch (error) {
      res.status(500).send({
        error: 'Ошибка произошла при синхронизации с Трелло'
      })
    }
  }
}

const { ReleasedService } = require('../models')

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('getnotifications', async () => {
      await ReleasedService.findAll({
        where: {
          status: 'unapproved'
        }
      }).then(services => {
        services = services.map((service) => {
          return service.toJSON()
        })
        socket.emit('notificationAdded', services)
      })
    })
  })
}

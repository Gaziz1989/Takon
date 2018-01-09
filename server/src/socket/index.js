const { ReleasedService } = require('../models')

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('addnotifications', async (_released) => {
      const released = await ReleasedService.create(JSON.parse(_released))
      socket.emit('notificationAdded', released)
    })
  })
}

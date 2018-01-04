const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const app = express()
const config = require('./config/config')
const path = require('path')
require('events').EventEmitter.prototype._maxListeners = 100

app.use(express.static(path.resolve(__dirname, '../static/')))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

require('./passport')
require('./cron')
require('./routes')(app)

sequelize.sync({
  force: false
})
  .then(() => {
    app.listen(config.port, function () {
      console.log('Application worker ' + process.pid + ' started')
    })
    console.log(`Server started at port ${config.port}`)
  })

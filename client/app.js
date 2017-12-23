var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()
app.use(express.static('./dist/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})
app.listen(8080, () => {
  console.log('Magic is happening on port 8080')
})

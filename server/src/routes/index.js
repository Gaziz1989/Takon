module.exports = (app) => {
  require('./authroutes')(app)
  require('./userroutes')(app)
  require('./serviceroutes')(app)
  require('./qrroutes')(app)
  require('./subscriptionroutes')(app)
  require('./historyroutes')(app)
}

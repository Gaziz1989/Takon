module.exports = (app) => {
  require('./authroutes')(app)
  require('./userroutes')(app)
  require('./serviceroutes')(app)
  require('./couponroutes')(app)
  require('./transactionroutes')(app)
  require('./qrroutes')(app)
  require('./subscriptionroutes')(app)
}

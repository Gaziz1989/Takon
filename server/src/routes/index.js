module.exports = (app) => {
  require('./authroutes')(app)
  require('./userroutes')(app)
  require('./serviceroutes')(app)
  require('./couponroutes')(app)
  require('./qrroutes')(app)
  require('./subscriptionroutes')(app)
}

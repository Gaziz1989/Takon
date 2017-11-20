module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'firstApp',
    user: process.env.DB_USER || 'firstApp',
    password: process.env.DB_PASS || 'firstApp',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      storage: './firstApp.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'super secret string like secretString or SECRETSTRING'
  }
}

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'takon',
    user: process.env.DB_USER || 'takon',
    password: process.env.DB_PASS || 'takon',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      storage: './takon.sqlite',
      freezeTableName: true
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'super secret string like secretString or SECRETSTRING'
  }
}

module.exports = {
  async getBalance (req, res) {
    try {
      console.log(req.headers.authorization.split(' ')[1])

      res.send({
        message: req.body.data
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}

module.exports = {
  async getBalance (req, res) {
    try {

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

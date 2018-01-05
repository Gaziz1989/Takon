
module.exports = {
  async AddBalanceHistory (req, res) {
    try {
      console.log(req.user)
    } catch (error) {
      res.status(500).send({
        error: 'Произошла какая то ошибка'
      })
    }
  }
}

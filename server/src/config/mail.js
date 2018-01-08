const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'gzhaiyk@gmail.com',
    pass: 'jgj7079048961'
  }
})

module.exports = (_email, _subject, _textContent) => {
  const mailOptions = {
    from: 'Gaziz Zhaiyk <gzhaiyk@gmail.com',
    to: _email,
    subject: _subject,
    text: _textContent
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (_error, info) => {
      if (_error) {
        reject(_error)
      } else {
        resolve(info)
      }
    })
  })
}

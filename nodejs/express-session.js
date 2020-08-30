var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
  
var app = express()

//사용자 요청이 있을 때 마다 app.use에 있는 코드를 실행하도록 한다.
app.use(session({
  secret: 'keyboard cat',
  // false일 경우 : session data 값이 변하기 전에는 session 저장소에 값을 저장하지 않는다.
  // true일 경우 : 값이 변하던 변하지 않았던 session 저장소에 값을 저장한다.
  // 걍 false로 두라
  resave: false, 
  // true일 경우 : session이 필요하기 전까지는 session을 구동시키지 않는다.
  saveUninitialized: true
}))
  
app.get('/', function (req, res, next) {
  res.send('Hello session');
})
 
app.listen(3000, function(){
    console.log('3000!');
});
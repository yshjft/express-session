var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var FileStore=require('session-file-store')(session);
  
var app = express()

//사용자 요청이 있을 때 마다 app.use에 있는 코드를 실행하도록 한다.
// app.use(session(~~))을 통해 req객체에 property로 session이라는 객체를 추가한다.
/*
사용자가 session id를 가진 상태에서 서버로 접속할 경우 request header에 쿠키값으로 서버쪽으로 session id를 전달한다.
이를 session 미들웨어가 session id값을 가지고 session store에서 session id 값에 대응대는 파일을 읽는다.
읽은 데이터를 기반으로 하여 req객체에 session이라고 하는 property에 객체를 추가한다.
*/
app.use(session({
  secret: 'keyboard cat',
  // false일 경우 : session data 값이 변하기 전에는 session 저장소에 값을 저장하지 않는다.
  // true일 경우 : 값이 변하던 변하지 않았던 session 저장소에 값을 저장한다.
  // 걍 false로 두라
  resave: false, 
  // true일 경우 : session이 필요하기 전까지는 session을 구동시키지 않는다.
  saveUninitialized: true,
  store : new FileStore(),
}))

//session 데이터 휘발성(메모리에 저장하기 때문)
app.get('/', function (req, res, next) {
  console.log(req.session);
  if(req.session.num === undefined){
    req.session.num=1;
  }else{
    req.session.num=req.session.num+1;
  }
  res.send(`Views :${req.session.num}`);
})
 
app.listen(3000, function(){
    console.log('3000!');
});
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
const { request, response } = require('express');

var authData={
  email : 'one@naver.com',
  password : '111111',
  nickname : 'hys',
}

router.get('/login', (request, response)=>{
  var title ='WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value='login'>
      </p>
    </form>
  `, '');
  response.send(html);
});

router.post('/login_process', (request, response)=>{
  var post = request.body;
  var email=post.email;
  var pwd=post.pwd;
  
  if(email === authData.email && pwd=== authData.password){
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    /*
      session 미들웨어는 기록한 데이터(request.session.nickname)를 session store에 기록하는 작업을 한다.
      메모리에 저장된 sesstion데이터를 저장소에 반영하는 작업을 한다.(시간이 굉장히 많이 걸릴 수 있다.)
    */
   request.session.save(function(){
     //session store에 반영작업 끝난 후에 redirection할 수 있다.
    response.redirect('/');
   });
  }else{
    response.send('who?');
  }  
});


router.get('/logout', function(request, response){
  request.session.destroy(function(err){
    response.redirect('/');
  });
});


module.exports = router;
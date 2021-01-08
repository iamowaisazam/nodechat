const express = require('express');
var router = express.Router();

//middlwares
const Auth = require('./middlewares/auth');

//Constrollers
const User = require('./controllers/UserController');
const Chat = require('./controllers/ChatController');






      //Chat Routes
      router.post('/Users/msgs/:id',Chat.getMsgs);
      router.get('/sendmsg',Chat.sendMsg);


      //Users
      router.post('/users/login',User.login);
      router.post('/users/create',User.create);

      router.get('/users',Auth,User.all);
      router.get('/users/id/:id',Auth,User.get);
      router.get('/users/delete/id/:id',Auth,User.delete);
      router.get('/users/profile',Auth,User.profile);
      router.get('/users/logout',Auth,User.logout);

      
      //404 Page
    router.get('*',function(req,res){
          res.send('404');
     });

module.exports = router;
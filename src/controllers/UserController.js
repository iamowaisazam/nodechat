const { check, validationResult } = require("express-validator");
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 //Get Msgs 
 exports.all = async function(req,res){
        db.query(`SELECT * FROM users`, function (err, result, fields) {

               if(err) throw err;         
               res.send(result);
         });
 }


 //Get
exports.get = async function(req,res){
    let id = req.params.id;
    if(id != null){
        db.query(`SELECT * FROM users  WHERE id = '${id}'`, function (err, result, fields) {
               if(err) throw err;         
               res.send(result);
         });
    }
}


//Login
exports.login = async function(req,res){

    await check('email').notEmpty().run(req);
    await check('password').notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.send({ 
            message: 'Invalid Data', 
            errors: errors.array(), 
            inputs: req.body, 
        });
    }


    //Serve Side Validation
    db.query(`SELECT * FROM users  WHERE email = '${req.body.email}'`, async function (err, result) {
        if(err) throw err;
        if(result.length > 0){

            const password = req.body.password;
            const dbpassword = result[0].password; 
            const passwordVerify = await bcrypt.compare(password,dbpassword);
           
            if(passwordVerify){
                let generate = Math.random().toString(30);
                db.query(`UPDATE users SET remember_token = '${generate}' WHERE id = '${result[0].id}'`, function (err, result) {
                    if (err) throw err;

                    res.send(generate);
                });

            }else{
                res.send('Wrong Password');     
            }
            
        }else{
            res.send('Email not Found');
        }
    }); 
}


//Create
exports.create = async function(req,res){

        await check('name').notEmpty().run(req);
        await check('username').notEmpty().run(req);
        await check('email').notEmpty().run(req);
        await check('password').notEmpty().run(req);


        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            res.send({ 
                message: 'Invalid Data', 
                errors: errors.array(), 
                inputs: req.body, 
            });
        }

        //Serve Side Validation
        db.query(`SELECT * FROM users  WHERE email = '${req.body.email}'`, function (err, result) {
            if(err) throw err;
            if(result.length > 0){
                res.send('Email All ready Exist');
            }
        });

         db.query(`SELECT * FROM users  WHERE name = '${req.body.username}'`, function (err, result) {
            if(err) throw err;
            if(result.length > 0){
                res.send('username All ready Exist');
            }
        });

        var query = "insert into users(display_name,name,email,password,role_id,status)values(";
        query+= " '"+req.body.name+"',";
        query+= " '"+req.body.username+"',";
        query+= " '"+req.body.email+"',";
        query+= " '"+ bcrypt.hashSync(req.body.password,10) +"',";
        query+= " '18',";
        query+= " 'pending')";

        db.query(query,(err, success) => {
        
            if(err) throw err;

                console.log('Last insert ID:', success.insertId);
                res.sendStatus(200);
        }); 

}

exports.profile = async function(req,res){

      res.send(req.auth);
}

exports.delete = async function(req,res){

    let id = req.params.id;
    if(id != null){

        db.query(`DELETE FROM users  WHERE id = '${id}'`, function (err, result) {
             if(err) throw err;       
               
             if(result.affectedRows){
                res.sendStatus(200);
             }else{
                res.send({ 
                    message: 'Not Found',  
                 });
             }
         });

    }

}


//Login
exports.logout = async function(req,res){

       db.query(`UPDATE users SET remember_token = '' WHERE id = '${req.auth.id}'`, function (err, result) {
        if (err) throw err;

            res.send({ 
                message: 'logout', 
            });
      });
       
}
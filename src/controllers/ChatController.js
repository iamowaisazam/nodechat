const { check, validationResult } = require("express-validator");
const rooms = require('../config/api');
const db = require('../config/db');



 //Get Msgs 
 exports.getMsgs = async function(req,res){
   
    let id = req.params.id;
    if(id != null){

        db.query(`SELECT * FROM complains  WHERE user_id = '${id}'`, function (err, result, fields) {

               if(err) throw err;         
               console.log(result);
               res.send(result);
         });

    }
}


exports.sendMsg = async function(req,res){

     //Validations
     await check('user_id').notEmpty().run(req);
     await check('is_admin').notEmpty().run(req);
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
         res.send({ 
             message: 'Invalid Data', 
             errors: errors.array(), 
             inputs: req.body, 
          });
     }

     res.send({ 
        message: 'Good',  
     });

     //After Validation
        // const formData = { 
        //         user_id: 7, 
        //         is_admin: 1,
        //         message:'message',
        //         status: 0,
        //     };  

        // db.query('INSERT INTO complains SET ?', formData, (err, res) => {
        // if(err) throw err;

        //    console.log('Last insert ID:', res.insertId);
        //    res.send(result);
        // });      
}



//Get All Users
 exports.getUsers = async function(req,res){

    db.query("SELECT * FROM users", function (err, result, fields) {
        if(err) throw err;  
           res.send(result);
        });
}
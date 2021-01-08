const db = require('../config/db');




module.exports = async (req,res,next) => {
     
       if(req.headers.authorization != null){

        let id = req.headers.authorization;
        db.query(`SELECT * FROM users  WHERE remember_token = '${id}'`, function (err, result) {

                if(result.length > 0){   

                    //    res.send(result);

                      req.auth = result[0];
                      next();
                }else{  

                        res.send('Auth Error');
                    }
                });

       }else{

                res.send('Auth Error');
       }

  
}
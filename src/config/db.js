const mysql = require('mysql');

const con = mysql.createConnection({
    host:"207.174.215.159",
    user:"coderzla_nodejs",
    password:"UTGgn~{Z!jfW",
    database:"coderzla_nodejs",
});

 con.connect(function(error){

        if(error) 
            throw error;
        else

        console.log('connected');
    });

module.exports = con
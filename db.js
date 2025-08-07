const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user: 'root',
    password: 'cdacacts',
    database: 'dac'

})

db.connect((err)=>{
    if(err){
        console.error('Error while connecting:', err);
        return
    }

    console.log('Connected to MySQL Database.')
})


module.exports = db;

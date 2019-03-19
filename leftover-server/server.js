const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const cors = require('cors');
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '630117122',
    database: 'leftover'
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

db.connect((err) => {
    if(err) {
        console.log("error", err);
    }
    console.log("MySql connected..");
});


app.post('/createUser', function(req, res) {
    console.log("user info", req);
    var user_id = req.body.uid;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    let sql = `INSERT into USERS VALUES('${user_id}','${firstname}','${lastname}','${email}');`;
    console.log("sql",sql);
    db.query(sql, (err, result) => {
        console.log("result",result,"error",err)
    });
    res.send('user successful created!');
});


app.listen('3000', () => {
    console.log("Serer started on port 3000");
});
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
const API = require("./api/api")

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


db.connect((err) => {
    if(err) {
        // console.log("error", err);
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

// ***************************API STUFF ****************************
app.post('/askQuestion', async function(req, res) {
    const question = req.body.question
    console.log(question)
    let answer = await API.askQuestion(question)
    console.log('answer', answer)
    res.send(answer)
})

app.listen('3000', () => {
    console.log("Server started on port 3000");
});

app.get('/askTrivia', async function(req, res) {
    let joke = await API.askTrivia()
    console.log('joke', joke)
    res.send(joke)

});


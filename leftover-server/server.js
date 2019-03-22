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
const connection = mysql.createConnection({multipleStatements: true});
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
        console.log("result")
    });
    res.send('user successful created!');
});

app.post('/addListId', function(req, res) {
    var list_id = req.body.list_id;
    var usrid = req.body.usrid;

       let sql1 = `INSERT into shoplist VALUES('${list_id}','${usrid}');`;
    //     console.log("sql",sql);
    //     db.query(sql, (err, result) => {
    //         console.log("result",result,"error",err);
    // });
       db.query(sql1, (err, result) => {
            console.log("result")
        });
        res.send("hooray")
   }
   );

   
app.post('/addList', function(req, res) {
    var items = req.body.items;
    var list_id = req.body.list_id;
    var usrid = req.body.userId;
    console.log(items)

        let sql2 = ""
        // let sql2 = []
        let stmt = `INSERT into item VALUES`;
        for(var i = 0; i < items.length; i++){
         if (i == items.length - 1) {
         stmt += `('${usrid}','${list_id}','${items[i].amount}','${items[i].price}','${items[i].name}');`;    
         }
         else{
              stmt += `('${usrid}','${list_id}','${items[i].amount}','${items[i].price}','${items[i].name}'),`;
        };
         }
       db.query(stmt, (err, result) => {
           console.log("BIG RESULT:",result,err)
            res.send("success")

        });

 });


// ***************************API STUFF ****************************
app.post('/getLists', function(req, res) {
    var usrid = req.body.usrid;
    let sql1 = `select * from shoplist where id = '${usrid}';`;
    //     console.log("sql",sql);
    //     db.query(sql, (err, result) => {
    //         console.log("result",result,"error",err);
    // });
       db.query(sql1, (err, result) => {
            console.log("result")
              res.send(result)
        });
   }
   );



app.post('/askQuestion', async function(req, res) {
    const question = req.body.question
    console.log(question)
    let answer = await API.askQuestion(question)
    console.log('answer', answer)
    res.send(answer)
})

app.post('/getOneList', function(req, res) {
    var usrId = req.body.id;
    let list_id = req.body.list_id
    console.log("pop",usrId,list_id)
    let sql1 = `select * from item where id = '${usrId}' && list_id = '${list_id}';`;
       db.query(sql1, (err, result) => {
            console.log("result",result,"error",err)
              res.send(result)
        });
   }
   );


app.listen('3000', () => {
    console.log("Server started on port 3000");
});

app.get('/askTrivia', async function(req, res) {
    let joke = await API.askTrivia()
    console.log('joke', joke)
    res.send(joke)

});


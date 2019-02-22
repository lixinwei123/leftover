//Initialize mysql
const mysql = require("mysql")
const options = {
    user: "root",
    password: "password",
    database: "DemoDb"
}
const connection = mysql.createConnection(options)


connection.connect(err => {
    if (err) {
        console.log('error connecting to mysql database', err)
        throw err
    }
    else {
        console.log('success')
    }
})
const mysql = require('mysql')

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "1234",
database:"blog_posts" 
})

module.exports = db;
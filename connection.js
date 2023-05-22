const mysql = require('mysql2');

class Connection{
    constructor(){
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "apitest"
        });
    }
}

module.exports = Connection;
const connection = require('./connection');

class Control{

    constructor(){
        connection.connect((err) => {
            if(err) reject(err);
            console.log('Conexão estabelecida com sucesso!');
        });
    }

    login(email, password){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM user WHERE userEmail = ? AND userPassword = ?";
            connection.query(sql, [email, password], (err, results, fields) => {
                if(err) reject(err);
                if(results.length > 0){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            });
        })
    }
    
}

const control = new Control();
module.exports = control;
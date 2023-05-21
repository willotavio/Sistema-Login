const connection = require('./connection');

class Control{

    constructor(){
        connection.connect((err) => {
            if(err) reject(err);
            console.log('Conexão estabelecida com sucesso!');
        });
    }

    login(userEmail, userPassword){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM user WHERE userEmail = ? AND userPassword = ?";
            connection.query(sql, [userEmail, userPassword], (err, results, fields) => {
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

    signup(userName, userEmail, userPassword){
        return new Promise((resolve, reject) => {
            this.checkAvailability(userEmail)
            .then((result) => {
                if(result){
                    let sql = "INSERT INTO user (userName, userEmail, userPassword) VALUES (?, ?, ?)";
                    connection.execute(sql, [userName, userEmail, userPassword], (err) => {
                        if(err) reject(err);
                        else{
                            resolve(true);
                        }
                    })
                } 
                else{
                    resolve(false);
                }
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
    checkAvailability(userEmail){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM user WHERE userEmail = ?";
            connection.query(sql, [userEmail], (err, results, fields) => {
                if(err) reject(err);
                if(results.length > 0){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            })
        })
    }
    
}

const control = new Control();
module.exports = control;
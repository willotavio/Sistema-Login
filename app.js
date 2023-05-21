const express = require('express');
const app = express();
const path = require('path');

const control = require('./control');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})
app.post('/login', async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    await control.login(userEmail, userPassword)
        .then((result) => {
            if(result){
                res.redirect('/');
            }
            else{
                res.send('dados incorretos!');
            }
        })
        .catch((err) => {
            console.log("erro");
        })
})

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
})
app.post('/cadastro', (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    control.signup(userName, userEmail, userPassword)
    .then((result) => {
        if(result){
            console.log("cadastro concluido!");
            res.redirect('/login');
        }
        else{
            res.send("email já cadastrado!");
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen('3000', () => {
    console.log("conectado ao servidor");
})
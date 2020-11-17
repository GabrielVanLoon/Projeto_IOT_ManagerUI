require('dotenv').config()
var express = require('express')
var app = express()
const cors = require('cors');

const port = process.env.SERVER_PORT || 3333

const auth = {
    username: process.env.AUTH_USERNAME || "username_here",
    password: process.env.AUTH_PASSWORD || "password_here"
}

const mqttAuthInformation = {
    host:       process.env.BROKER_HOST || "localhost",
    port:       process.env.BROKER_PORT || 9001,
    username:   process.env.BROKER_USERNAME || "mqtt_username_here",
    password:   process.env.BROKER_PASSWORD || "mqtt_password_here"
}

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors());
    next();
});

app.post('/api/auth',(req, res) => {
    console.log("Login attempt at", Date())
    
    if(req.body.username === undefined || req.body.password === undefined){
        console.log("Invalid fields")
        res.status(400)
        res.json({error:'Invalid Request. Username and password required.'})
    
    } else if(req.body.username !== auth.username || req.body.password !== auth.password){
        console.log("Invalid Credentials.")
        res.status(400)
        res.json({error:'Invalid username or password.'})
    
    } else {
        console.log("Login Successful")
        res.json(mqttAuthInformation)
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
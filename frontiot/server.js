require('dotenv').config()
var express = require('express')
var app = express()
const path = require('path');
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

// @TODO: Please remove this line in production
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors());
    next();
});

// Serve the static content from React
app.use(express.static('build'))

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

// Microsservices simulation
let airSimulation = {
    max: 23,
    min: 26,
    target: 20,
    airStatus: true,
    mode: true,
}

app.get('/air-information',(req, res) => {
    console.log("Air Information Simmulated at ", Date())
    res.json(airSimulation)
})

app.post('/change-mode',(req, res) => {
    console.log("Change Mod Simulated at ", Date())
    
    if(req.body.mode === undefined){
        res.status(400)
        res.json({error:'Invalid Request. Username and password required.'})
    
    } else {
        airSimulation.mode = req.body.mode
        res.json()
    }
})

app.post('/set-temperature',(req, res) => {
    console.log("Change Mod Simulated at ", Date())
    
    if(req.body.min !== undefined)
        airSimulation.min = req.body.min
    if(req.body.max !== undefined)
        airSimulation.max = req.body.max
    if(req.body.target !== undefined)
        airSimulation.target = req.body.target
    if(req.body.airStatus !== undefined)
        airSimulation.airStatus = req.body.airStatus

    res.json()
})

app.get('/temperature-avg',(req, res) => {
    console.log("Change Mod Simulated at ", Date())
    res.json({avg: 24.6})
})

app.get('/sensor-history',(req, res) => {
    console.log("Change Mod Simulated at ", Date())

    if(req.body.topic === undefined){
        res.status(400)
        res.json({error:'Invalid Request. Sensor Topic Required.'})
    
    } else if (req.body.topic.includes("temp")) {
        res.json({
            size: 5,
            results: [
                '{"s":"20/11/2020 12:30:44","0":21,"temp":24.7}',
                '{"s":"21/11/2020 12:30:44","0":21,"temp":28.0}',
                '{"s":"22/11/2020 12:30:44","0":21,"temp":22.3}',
                '{"s":"23/11/2020 12:30:44","0":21,"temp":18.4}',
                '{"s":"24/11/2020 12:30:44","0":21,"temp":19.5}',
            ]
        })
    } else if (req.body.topic.includes("umid")) {
        res.json({
            size: 5,
            results: [
                '{"s":"20/11/2020 12:30:44","0":21,"umid":24.7}',
                '{"s":"21/11/2020 12:30:44","0":21,"umid":28.0}',
                '{"s":"22/11/2020 12:30:44","0":21,"umid":22.3}',
                '{"s":"23/11/2020 12:30:44","0":21,"umid":18.4}',
                '{"s":"24/11/2020 12:30:44","0":21,"umid":19.5}',
            ]
        })
    }
})

app.use( (req,res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
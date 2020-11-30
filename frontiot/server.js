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

const microsserviceInformation = {
    host:       process.env.MICRO_HOST || "localhost",
    port:       process.env.MICRO_PORT || 3333,
    APIKEY:     process.env.MICRO_APIKEY || "32_bytes_hash_here"
}

function getRand(min, max) {
    return Math.random() * (max - min) + min;
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
        res.json({
            mqtt: mqttAuthInformation,
            microsservices: microsserviceInformation
        })
    }
})

// Microsservices simulation
let airSimulation = {
    min: 16,
    max: 23,
    target: 20,
    airStatus: 1,
    airMode: "auto",
}

app.get('/air-information',(req, res) => {
    console.log("Air Information Simmulated at ", Date())
    res.json(airSimulation)
})

app.post('/change-mode',(req, res) => {
    console.log("Change Mod Simulated at ", Date())
    
    if(req.query.airMode === undefined){
        res.status(400)
        res.json({error:'Invalid Request. Username and password required.'})
    
    } else {
        airSimulation.airMode = req.query.airMode
        res.json()
    }
})

app.post('/set-temperature',(req, res) => {
    console.log("Change Mod Simulated at ", Date())
    
    if(req.query.min !== undefined)
        airSimulation.min = req.query.min
    if(req.query.max !== undefined)
        airSimulation.max = req.query.max
    if(req.query.target !== undefined)
        airSimulation.target = req.query.target
    if(req.query.airStatus !== undefined)
        airSimulation.airStatus = req.query.airStatus
    if(req.query.airMode !== undefined)
        airSimulation.airMode = req.query.airMode

    res.json()
})

// app.get('/temperature-avg',(req, res) => {
//     console.log("Change Mod Simulated at ", Date())
//     res.json({avg: 24.6})
// })

app.get('/sensor-history',(req, res) => {
    console.log("Change Mod Simulated at ", Date())

    if(req.query.topic === undefined){
        res.status(400)
        res.json({error:'Invalid Request. Sensor Topic Required.'})
    
    } else if (req.query.topic.includes("temp")) {
        let fake = {
            size: 5,
            results: []
        }

        const qtd = req.query.period * 60 //getRand(200,500)
        for(let i = 0; i < qtd; i++)
            fake.results.push(JSON.parse(`{"s":"${(1+i)%30}/${(1+i)%12}/2020 12:30:44","0":21,"temp":${getRand(18,35)}}`))
        res.json(fake)

    } else if (req.query.topic.includes("umid")) {
        let fake = {
            size: 5,
            results: []
        }

        const qtd = req.query.period * 60 //getRand(200,500)
        for(let i = 0; i < qtd; i++)
            fake.results.push(JSON.parse(`{"s":"${(1+i)%30}/${(1+i)%12}/2020 12:30:44","0":21,"umid":${getRand(10,50)}}`))
        res.json(fake)
    }
})

app.use( (req,res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
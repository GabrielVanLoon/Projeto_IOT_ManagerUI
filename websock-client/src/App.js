import React, {useState, useEffect} from 'react'
import mqtt from 'mqtt'
import './App.css'

import Luminosity from './components/Luminosity/Luminosity'
import Temperature from './components/Temperature/Temperature'
import Humidity from './components/Humidity/Humidity'
import Movement from './components/Movement/Movement'
import AirConditioning from './components/AirConditioning/AirConditioning'

// Client global consumidor do MQTT
var mqtt_client  = mqtt.connect({
    protocol: process.env.MQTT_PROTOCOL || 'mqtt',
    host:process.env.MQTT_HOST || 'localhost',
    port: process.env.MQTT_PORT || 9001
})

function App() {

    const [clientConnectionState, setConnectionState] = useState(false)

    useEffect( () => {
        mqtt_client.on('connect', () => setConnectionState(true))
        mqtt_client.on('reconnect', () => setConnectionState(true))
        
        mqtt_client.on('disconnect', () => setConnectionState(false))
        mqtt_client.on('error', () => setConnectionState(false))
        mqtt_client.on('end', () => setConnectionState(false))
        mqtt_client.on('offline', () => setConnectionState(false))
    }, [])

    return (
        <div className="App">
            <header> 
                <h1>Websocket Client App</h1> 
            </header>
            
            <main>
                { !clientConnectionState && 
                <h2>Status: Aguardando conexão....</h2> }
            
                { clientConnectionState && 
                <h2>Status: Broker MQTT Conectado com sucesso!</h2> }                 

                <Luminosity  client={mqtt_client}  />
                <Temperature  client={mqtt_client} />
                <Humidity  client={mqtt_client} />
                <Movement  client={mqtt_client} />
                <AirConditioning  client={mqtt_client} />
            </main>
        </div>
    );
}

export default App

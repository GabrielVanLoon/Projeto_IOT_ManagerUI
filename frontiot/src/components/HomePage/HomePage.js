import React, { Component , useState, useEffect} from 'react';
import mqtt from 'mqtt'

import AirConditioning from '../AirConditioning/AirConditioning'
import Luminosity from '../Luminosity/Luminosity'
import Temperature from '../Temperature/Temperature'
import Humidity from '../Humidity/Humidity'
import Movement from '../Movement/Movement'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';

import './HomePage.css';

// Client global consumidor do MQTT
var mqtt_client  = mqtt.connect({
  protocol: process.env.MQTT_PROTOCOL || 'mqtt',
  host:process.env.MQTT_HOST || '127.0.0.1',
  port: process.env.MQTT_PORT || 9001
})

function HomePage() {

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
      <div className="HomePage">
          <header> 
          </header>
          
          <main>
              { !clientConnectionState && 
              <h2>Status: Aguardando conexão....</h2> }
          
              { clientConnectionState && 
              <h2>Status: Broker MQTT Conectado com sucesso!</h2> }                 
              <Grid container direction="row" alignItems="center">
                <Luminosity  client={mqtt_client}  />
                <Temperature  client={mqtt_client} />
                <Humidity  client={mqtt_client} />
                <Movement  client={mqtt_client} />
              </Grid>
              <Grid container direction="row" alignItems="center">
                <AirConditioning  client={mqtt_client} />
              </Grid>
              
          </main>
      </div>
  );
}

export default HomePage

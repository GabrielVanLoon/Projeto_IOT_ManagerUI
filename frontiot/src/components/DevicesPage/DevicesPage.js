import React, { Component , useState, useEffect} from 'react'
import './DevicesPage.css'

import mqtt from 'mqtt'
import { getToken } from '../../services/auth'


import AirConditioning from '../AirConditioning/AirConditioning'
import Luminosity from '../Luminosity/Luminosity'
import Temperature from '../Temperature/Temperature'
import Humidity from '../Humidity/Humidity'
import Movement from '../Movement/Movement'

import { Paper, withStyles, Grid, Typography, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


// Client global consumidor do MQTT
var mqtt_client = null;

function DevicesPage() {
  
  const [clientConnectionState, setConnectionState] = useState(false)

  useEffect( () => {
      if(mqtt_client != null)
        mqtt_client.end()

      if(!getToken().mqtt)
        return

      mqtt_client = mqtt.connect({
        ...getToken().mqtt,
        protocol: 'mqtt',
      })

      mqtt_client.on('connect', () => setConnectionState(true))
      
      mqtt_client.on('disconnect', () => setConnectionState(false))
      mqtt_client.on('error', () => setConnectionState(false))
      mqtt_client.on('end', () => setConnectionState(false))
      mqtt_client.on('offline', () => setConnectionState(false))

  }, [])

  return (
    <div className="DevicesPage">
      <Container>
        { !clientConnectionState &&
          <Grid container direction="column" alignItems="center" alignContent="center">
              <Paper className="CustomPaper">
                <Typography variant="h4" align="center">
                  Connecting Devices <br/><br/><CircularProgress />
                </Typography>
              </Paper>
          </Grid>
        }

        { mqtt_client && clientConnectionState && 
          <Grid container spacing={3} justify="center" alignItems="center">
            <AirConditioning  client={mqtt_client} />
            <Temperature  client={mqtt_client} />
            <Humidity  client={mqtt_client} />
            <Luminosity  client={mqtt_client}  />
            <Movement  client={mqtt_client} />
          </Grid>
        }
      </Container>

    </div>
  );
}

export default DevicesPage

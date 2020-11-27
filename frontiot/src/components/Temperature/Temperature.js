import React, {useState, useEffect} from 'react'
import Temp   from '../../img/heat.svg'
import schema from '../../things_schema.json'

import { Paper, Grid, Typography } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';

function TemperatureSensor(props) {

    const sensorTopic = `${schema.room.id}/temp/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)

    useEffect(() => {
        props.client.subscribe(sensorTopic)
        props.client.on('message', function (topic, message) {
            if(topic !== sensorTopic)
                return        
            console.log("IN ", sensorTopic, message.toString())
            setSensorValue(JSON.parse(message.toString()))
        });
    }, [])

    return(        
        <Grid item xs={6} md={6} lg={4}>
            <Paper elevation={3} style={{ paddingTop: 10 }}>
                {/* <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3> */}
                
                <Grid container spacing={2} alignItems="center">
                    
                    <Grid item xs={12}>
                        <img src={Temp} alt="temp" style={{ maxWidth: 200 }}/>
                    </Grid>

                    <Grid item>
                        {/* <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/> */}
                        { !sensorValue["0"] && <WifiOffIcon className="StatusIcon" /> }
                        { sensorValue["0"] && <WifiIcon className="StatusIcon Subscribed" /> }
                    </Grid>

                    <Grid item style={{ flexGrow: 1, textAlign: "left" }}>
                        <Typography variant="h6"><strong>Temperature Sensor</strong></Typography>
                        <Typography><strong>Status:</strong> { sensorValue["0"] ? 'Device Connected' : 'Device Connection Error' }</Typography>
                        <Typography> <strong>Temperature:</strong> { sensorValue["temp"] || "unknown" } ºC </Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
        </Grid>
    )
}

function Temperature(props) {
    return (
        <>
        { schema.room.sensors.temperature.map((sensorID, index) => 
            <TemperatureSensor sensorID={sensorID} client={props.client} key={index} /> )
        }
        </>    
    )
}

export default Temperature
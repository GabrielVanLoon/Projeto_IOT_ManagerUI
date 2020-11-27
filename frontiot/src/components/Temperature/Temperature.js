import React, {useState, useEffect} from 'react'
import Temp   from '../../img/heat.svg'
import schema from '../../things_schema.json'

import { Paper, Grid } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 4,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

function TemperatureSensor(props) {

    const classes = styles

    const sensorTopic = `${schema.room.id}/temp/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)
    const [newValues, setNewValues] = useState({
        "s": "29/10/20 23:48:33",
        "temp": 24,
        "0": props.sensorID
    })

    useEffect(() => {
        props.client.subscribe(sensorTopic)
        props.client.on('message', function (topic, message) {
            if(topic !== sensorTopic)
                return        
            console.log("IN ", sensorTopic, message.toString())
            setSensorValue(JSON.parse(message.toString()))
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.client.publish(sensorTopic, JSON.stringify(newValues))
    }

    return(        
        <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={3} >
                <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                <img src={Temp} alt="temp" style={{ height: 100, width: 100 }}/>
                <Grid container alignItems="center">
                    
                    <Grid item xs={1}>
                        <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/>
                    </Grid>

                    <Grid item xs={11}>
                        <p><strong>Sensor de Temperatura</strong></p>
                        <p>{sensorValue["0"] ? 'Ligado' : 'Desligado' }</p>
                    </Grid>

                    <Grid item>
                    <p><strong>Temperatura:</strong> {sensorValue["temp"] || 'unknow'} ºC </p>
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
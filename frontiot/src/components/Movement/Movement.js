import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';

function MovementSensor(props) {

    const sensorTopic = `${schema.room.id}/movimento/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)
    const [newValues, setNewValues] = useState({
        "s": "29/10/20 23:48:33",
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
        <div className="MovementSensor SensorCard">
            <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
            <Paper elevation={3}>
                    <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid>
                                <Grid item>
                                    <p><strong>ID do Dispositivo:</strong> {sensorValue["0"] || 'unknow'} </p>
                                </Grid>
                                <Grid item>
                                    <p><strong>Data:</strong> {sensorValue["s"] || 'unknow'} </p>
                                </Grid>
                                <Grid item>
                                    <p><strong>Raw:</strong> {sensorValue && JSON.stringify(sensorValue)} </p>
                                </Grid>
                        </Grid>
                    </Grid>
            </Paper>
        </div>
    )
}

function Movement(props) {
    return (
        <div className="Movement SensorSection" >
            <h2>Sensores de Movimento</h2>
            <Grid container direction="row" alignItems="center">
                { schema.room.sensors.movement.map((sensorID, index) => 
                    <MovementSensor sensorID={sensorID} client={props.client} key={index} /> )
                }
            </Grid>
        </div>
    )
}

export default Movement
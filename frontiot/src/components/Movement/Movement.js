import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';
import Move from '../../img/movimento.svg'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
        <Grid item xs={4}>
            <Paper elevation={3} >
                <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                <img src={Move} alt="move" style={{ height: 100, width: 100 }}/>
                <Grid container alignItems="center">
                    <Grid item xs={1}>
                        <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/>
                    </Grid>
                    <Grid item xs={11}>
                        <p><strong>Sensor de Movimento</strong></p>
                        <p>{sensorValue["0"] ? 'Ligado' : 'Desligado' }</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

function Movement(props) {
    return (
        <>
            { schema.room.sensors.movement.map((sensorID, index) => 
                <MovementSensor sensorID={sensorID} client={props.client} key={index} /> )
            }
        </>
    )
}

export default Movement
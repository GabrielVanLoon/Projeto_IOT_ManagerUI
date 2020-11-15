import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 4,
    },
    padding: {
        padding: theme.spacing.unit
    }
});



function HumiditySensor(props) {
    const classes = styles

    const sensorTopic = `${schema.room.id}/umid/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)
    const [newValues, setNewValues] = useState({
        "s": "29/10/20 23:48:33",
        "umid": 40.0,
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
        <div className="HumiditySensor SensorCard">
            <Paper className={classes.padding} elevation={3}>
                <div className={classes.margin}>
                    <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                        <Grid container direction="row" alignItems="center" justify="space-between">
                            <Grid>
                                
                                    <Grid item>
                                        <p><strong>ID do Dispositivo:</strong> {sensorValue["0"] || 'unknow'} </p>
                                    </Grid>
                                    <Grid item>
                                    <p><strong>Estado:</strong> {sensorValue["umid"] || 'unknow'}% umidade </p>
                                    </Grid>
                                    <Grid item>
                                        <p><strong>Data:</strong> {sensorValue["s"] || 'unknow'} </p>
                                    </Grid>
                                    <Grid item>
                                        <p><strong>Raw:</strong> {sensorValue && JSON.stringify(sensorValue)} </p>
                                    </Grid>
                                
                                    <form onSubmit={handleSubmit}>
                                        
                                    <input hidden = 'True' type="number" value={props.sensorID} disabled/>
                                    <Grid item>
                                    <TextField id="standard-basic" label="Estado" type="number" value={newValues["umid"]}  onChange={e => setNewValues({...newValues, "umid": e.target.value })}/>                                        
                                    </Grid>
                                    <input hidden = 'True' value={newValues["s"]} 
                                        onChange={e => setNewValues({...newValues, "s": e.target.value })} />
                                    
                                    <Grid item>
                                        <p><button type="submit">Publicar Atualizações</button></p>
                                    </Grid>
                                    </form>
                                
                            </Grid>
                        </Grid>
                </div>
            </Paper>
        </div>
    )
}

function Humidity(props) {
    return (
        <div className="Humidity SensorSection" >
            <h2>Sensores de Humidade</h2>
            <Grid container direction="row" alignItems="center">
            { schema.room.sensors.humidity.map((sensorID, index) => 
                <HumiditySensor sensorID={sensorID} client={props.client} key={index} /> )
            }
            </Grid>
            
        </div>
    )
}

export default Humidity
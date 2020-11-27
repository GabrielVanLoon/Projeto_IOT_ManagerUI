import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';
import Humi from '../../img/gotas-de-agua.svg'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
        <Grid item xs={4}>
            <Paper elevation={3} >
                <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                <img src={Humi} alt="humi" style={{ height: 100, width: 100 }}/>
                <Grid container alignItems="center">
                    <Grid item xs={1}>
                        <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/>
                    </Grid>
                    <Grid item xs={11}>
                        <p><strong>Sensor de Umidade</strong></p>
                        <p>{sensorValue["0"] ? 'Ligado' : 'Desligado' }</p>
                    </Grid>
                    <Grid item>
                        <p><strong>Estado:</strong> {sensorValue["umid"] || 'unknow'}% umidade </p>
                    </Grid>
                    {/* <form onSubmit={handleSubmit}>
                        
                    <input hidden = 'True' type="number" value={props.sensorID} disabled/>
                    <Grid item>
                    <TextField id="standard-basic" label="Estado" type="number" value={newValues["umid"]}  onChange={e => setNewValues({...newValues, "umid": e.target.value })}/>                                        
                    </Grid>
                    <input hidden = 'True' value={newValues["s"]} 
                        onChange={e => setNewValues({...newValues, "s": e.target.value })} />
                    
                    <Grid item>
                        <p><button type="submit">Publicar Atualizações</button></p>
                    </Grid>
                    </form> */}
                </Grid>
            </Paper>
        </Grid>
    )
}

function Humidity(props) {
    return (
        <>
            { schema.room.sensors.humidity.map((sensorID, index) => 
                <HumiditySensor sensorID={sensorID} client={props.client} key={index} /> )
            }
        </>
    )
}

export default Humidity
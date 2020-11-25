import React, { useState, useEffect } from 'react'
import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Lamp from "../../img/luminaria.svg";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 4,
    },
    padding: {
        padding: theme.spacing.unit
    }
});


function LuminositySensor(props) {
    const classes = styles 

    const sensorTopic = `${schema.room.id}/luz/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)
    const [newValues, setNewValues] = useState({
        "s": "29/10/20 23:48:33",
        "21": 1,
        "0": props.sensorID
    })

    useEffect(() => {
        props.client.subscribe(sensorTopic)

        props.client.on('message', function (topic, message) {
            if (topic !== sensorTopic)
                return
            console.log("IN ", sensorTopic, message.toString())
            setSensorValue(JSON.parse(message.toString()))
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.client.publish(sensorTopic, JSON.stringify(newValues))
    }

    return (
        <Grid item xs={4}>
        <Paper elevation={3} >
            <div >
                <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
                <img src={Lamp} alt="lamp" style={{ height: 100, width: 100 }}/>
                    <Grid container alignItems="center">
                        <Grid item xs={1}>
                            <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/>
                        </Grid>
                        <Grid item xs={11}>
                            <p><strong>Sensor de Luminosidade</strong></p>
                            <p>{sensorValue["0"] ? 'Ligado' : 'Desligado' }</p>
                        </Grid>
                        {/* <form onSubmit={handleSubmit}>
                        <input hidden = 'True' type="number" value={props.sensorID} disabled/>
                        <Grid item>
                        <strong>Estado</strong> 
                            <Switch
                                checked={newValues["21"]}
                                onChange={e => setNewValues({...newValues, "21": e.target.value })}
                                name="checkedB"
                                color="primary"
                            />
                        </Grid>
                        <input hidden = 'True' value={newValues["s"]} 
                            onChange={e => setNewValues({...newValues, "s": e.target.value })} />
                        
                        <Grid item>
                            <p><button type="submit">Publicar Atualizações</button></p>
                        </Grid>
                        </form> */}
                    </Grid>
            </div>
        </Paper>
        </Grid>
    )
}
function Luminosity(props) {
    return (
            <>
                { schema.room.sensors.luminosity.map((sensorID, index) =>
                    <LuminositySensor sensorID={sensorID} client={props.client} key={index} />)
                }
            </>
    )
}

export default Luminosity
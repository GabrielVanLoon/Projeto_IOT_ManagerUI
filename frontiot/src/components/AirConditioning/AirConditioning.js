import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'
import '../Style/style.css'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Divider, Switch } from '@material-ui/core';
import Aircon from "../../img/ar-condicionado.svg";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 4,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

const getRandom = () => Math.floor(Math.random() * (99999 - 10000) + 10002)

const defaultValues = {
    "0": 0,              // Codigo de comando >> soma dos commandCodes
    "1": 18,            // temperatura máxima [17,23]
    "2": 16,            // temperatura mínima [16,22]
    "3": 10,            // tempo (minutos) entre comandos [1,120]   
    "4": 17,            // temperatura operante [16,23]
    "21": 0,            // ON: 1 e OFF: 0
    "22": 1,            // ON: 1 e OFF: 0  (estado com a sala vazia)
    "23": getRandom(),  // ID da mensagem
    "s": "29/10/20 23:48:33"
}

const commandCodes = {"1":4, "2":8, "3":16, "4":32, "21":1, "22":2 }

function AirResponser(props){

    const sensorSubscribeTopic = `${schema.team}/aircon/${props.sensorID}`
    const sensorPublishTopic = `${schema.team}/response`

    const [sensorValue, setSensorValue] = useState({...defaultValues})

    useEffect(() => {
        props.client.subscribe(sensorSubscribeTopic)

        props.client.on('message', function (topic, message) {
            if(topic !== sensorSubscribeTopic)
                return
            
            let newValues = {...sensorValue, ...JSON.parse(message.toString())}
            // alert(JSON.stringify(newValues))
            props.client.publish(sensorPublishTopic, JSON.stringify(newValues))
            setSensorValue(newValues)
        });
    }, [])

    return(<></>)
}

function AirConditioningSensor(props) {

    const sensorPublishTopic = `${schema.team}/aircon/${props.sensorID}`
    const sensorSubscribeTopic = `${schema.team}/response`
    
    const [sensorValue, setSensorValue] = useState(false)
    const [newValues, setNewValues] = useState({...defaultValues})
    
    useEffect(() => {
        props.client.subscribe(sensorSubscribeTopic)

        props.client.on('message', function (topic, message) {
            if(topic !== sensorSubscribeTopic)
                return        
            console.log("IN ", sensorSubscribeTopic, message.toString())
            setSensorValue(JSON.parse(message.toString()))
        });

        // Mensagem de Sincronizacao
        const syncMessage = { "0":0, "23":10000, "s":newValues["s"] }
        props.client.publish(sensorPublishTopic, JSON.stringify(syncMessage))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Gerando a mensagem + command sum
        let finalMessage = { "0":0, "23":newValues["23"], "s":newValues["s"] }

        for(let k in commandCodes){
            if(newValues[k] !== sensorValue[k]){
                finalMessage[k]    = newValues[k]
                finalMessage["0"] += commandCodes[k]
            }
        }
        
        // alert(`soma total: ${finalMessage["0"]}`)
        props.client.publish(sensorPublishTopic, JSON.stringify(finalMessage))
        setNewValues({...newValues, "23": getRandom() })
    }

    const increaseTemp = ()=> {
        if(newValues["4"]<28){
            setNewValues({...newValues, "4": newValues["4"]+1 })
        }
    }
    const decreaseTemp = ()=> {
        if(newValues["4"]>16){
            setNewValues({...newValues, "4": newValues["4"]-1 })
        }
    }
    const turnOnOff = ()=> {
        if(newValues["21"]){
            setNewValues({...newValues, "21": 0 })
        }else{
            setNewValues({...newValues, "21": 1 })
        }
    }

    const emptyRoom = ()=> {
        if(newValues["22"]){
            setNewValues({...newValues, "22": 0 })
        }else{
            setNewValues({...newValues, "22": 1 })
        }
    }

    return(
            <Grid item xs={4}>
            <Paper elevation={3} >
                <h3>Sensor {props.sensorID} at <span className="highlight">{sensorPublishTopic}</span></h3>
                <img src={Aircon} alt="aircon" style={{ height: 100, width: 100 }}/>
                <Grid container>
                    <Grid item xs={1}>
                        <PowerSettingsNewIcon style={{ 'font-size' : '3.5rem' }}/>
                    </Grid>
                    <Grid item xs={11}>
                        <p><strong>Sensor de Umidade</strong></p>
                        <p>{sensorValue["0"] ? 'Ligado' : 'Desligado' }</p>
                    </Grid>
                    <Grid item>
                        <p><strong>Estado:</strong> {sensorValue["21"] || 'unknow'}</p>
                    </Grid>
                    {/* <Grid item>
                        <p><strong>ID do Dispositivo:</strong> {sensorValue["0"] || 'unknow'} </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Temperatura Máxima:</strong> {sensorValue["1"] || 'unknow'} ºC </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Temperatura Mínima:</strong> {sensorValue["2"] || 'unknow'} ºC </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Tempo entre Comandos:</strong> {sensorValue["3"] || 'unknow'} minutos </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Temperatura Operante:</strong> {sensorValue["4"] || 'unknow'} ºC </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Ar Ligado:</strong> {sensorValue["21"] || '0'} </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Ar Ligado (Sala Vazia):</strong> {sensorValue["22"] || '0'} </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Identificador:</strong> {sensorValue["23"] || 'unknow'} </p>
                    </Grid>
                    <Grid item>
                    <p><strong>Data:</strong> {sensorValue["s"] || 'unknow'} </p>
                    </Grid>
                    <Grid item>
                        <strong>Raw:</strong> {sensorValue && JSON.stringify(sensorValue)}
                    </Grid>*/} 
                    </Grid>
                <Grid container justify="center" alignItems="center">
                    <form onSubmit={handleSubmit}>
                        <input hidden = 'True' type="number" value={props.sensorID} disabled/>
                        <input hidden = 'True' type="number" value={newValues["1"]} min="17" max="23"
                            onChange={e => setNewValues({...newValues, "1": e.target.value })} />                     
                        <input hidden = 'True' type="number" value={newValues["2"]} min="16" max="22"
                            onChange={e => setNewValues({...newValues, "2": e.target.value })} />
                        <input hidden = 'True' type="number" value={newValues["3"]} min="1" max="120"
                            onChange={e => setNewValues({...newValues, "3": e.target.value })} />
                        <input hidden = 'True' type="number" value={newValues["4"]} min="16" max="30"
                                onChange={e => setNewValues({...newValues, "4": e.target.value })} />
                        <input hidden = 'True' type="number" value={newValues["21"]} min="0" max="1"
                                onChange={e => setNewValues({...newValues, "21": e.target.value })} />
                        <input hidden = 'True' type="number" value={newValues["22"]} min="0" max="1"
                                onChange={e => setNewValues({...newValues, "22": e.target.value })} /> 
                        <Grid item spacing={12}>
                        <p><strong>Temperatura:</strong></p>
                            <Button onClick={increaseTemp} variant="contained" color="primary" style={{'border-radius':'10%'}}><AddIcon/></Button>
                            <strong>{newValues["4"] || 'unknow'} ºC </strong>
                            <Button onClick={decreaseTemp} variant="contained" color="primary" style={{'border-radius':'10%'}}><RemoveIcon/></Button>
                        </Grid> 
                        <Grid item>
                            <p><strong>Ar Ligado:</strong></p>
                            <Switch checked={newValues["21"]}
                            onChange={turnOnOff}
                            color="primary"/>
                        </Grid>
                        <Grid item>
                            <p><strong>Ar Ligado (Sala Vazia):</strong></p>
                                <Switch checked={newValues["22"]} 
                                onChange={emptyRoom}
                                color="primary"/>
                        </Grid>
                        <Grid item>
                            <input  hidden = 'True' type="number" value={newValues["23"]} disabled/>
                        </Grid> 
                        <Grid item>
                            <input hidden = 'True' min="0" max="1" value={newValues["s"]} 
                                onChange={e => setNewValues({...newValues, "s": e.target.value })} />
                        </Grid>
                        <Grid item>
                            <p><button type="submit">Publicar Atualizações</button></p>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    )
}

function AirConditioning(props) {
    return (
        
        <>
            { schema.room.sensors.airConditioning.map((sensorID, index) => 
                <AirResponser sensorID={sensorID} client={props.client} key={index} /> )
            }

            { schema.room.sensors.airConditioning.map((sensorID, index) => 
                 <AirConditioningSensor sensorID={sensorID} client={props.client} key={200+index} /> )
            }
        </>
    )
}

export default AirConditioning
import React, {useState, useEffect} from 'react'

import schema from '../../things_schema.json'

function TemperatureSensor(props) {

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
        <div className="TemperatureSensor SensorCard">
            <h3>Sensor {props.sensorID} at <span className="highlight">{sensorTopic}</span></h3>
            
            <div className="CardColumns">
                <div className="sub">
                    <p><strong>ID do Dispositivo:</strong> {sensorValue["0"] || 'unknow'} </p>
                    <p><strong>Estado:</strong> {sensorValue["temp"] || 'unknow'} ºC </p>
                    <p><strong>Data:</strong> {sensorValue["s"] || 'unknow'} </p>
                    <p><strong>Raw:</strong> {sensorValue && JSON.stringify(sensorValue)} </p>
                </div>

                <div className="pub">
                    <form onSubmit={handleSubmit}>
                    <p><strong>ID do Dispositivo:</strong>
                        <input type="number" value={props.sensorID} disabled/> </p>
                    
                    <p><strong>Estado:</strong> 
                        <input type="number" value={newValues["temp"]} 
                            onChange={e => setNewValues({...newValues, "temp": e.target.value })} /> </p>
                    
                    <p><strong>Data:</strong>
                        <input min="0" max="1" value={newValues["s"]} 
                            onChange={e => setNewValues({...newValues, "s": e.target.value })} /> </p>
                    <p><button type="submit">Publicar Atualizações</button></p>
                    
                    </form>
                </div>
            </div>

        </div>
    )
}

function Temperature(props) {
    return (
        <div className="Temperature SensorSection" >
            <h2>Sensores de Temperatura</h2>
            { schema.room.sensors.temperature.map((sensorID, index) => 
                <TemperatureSensor sensorID={sensorID} client={props.client} key={index} /> )
            }
        </div>
    )
}

export default Temperature
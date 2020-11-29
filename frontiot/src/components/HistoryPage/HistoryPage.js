import React, { useRef, useState, useEffect } from 'react';
import './HistoryPage.css';

import schema from '../../things_schema.json'
import SensorChart from './SensorChart'
import microAPI from '../../services/microsservice'

import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import TemperatureIcon from '../../img/heat.svg'
import HumidityIcon from '../../img/gotas-de-agua.svg'


function HistoryPage(props){

    const chartContainer = useRef(null);
    const [chartWidth, setChartWidth] = useState(null)
    const [chartHeight, setChartHeight] = useState(null)

    const [currentTopic, setcurrentTopic] = useState(null)
    const [dataset, setDataset] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        if(chartContainer.current) {
            setChartWidth(chartContainer.current.offsetWidth)
            setChartHeight(chartContainer.current.offsetWidth/2)
        }


    }, [chartContainer])

    const renderItem = (SensorIcon, topic, text) => {
        return(
            <ListItem key={topic} button color="inherit" onClick={() => setcurrentTopic(topic)}>
                <ListItemIcon>
                    <img className="SensorIcon" src={SensorIcon} alt="temp"/>
                </ListItemIcon>
                <ListItemText primary={text}  />
            </ListItem>

        );
    }

    useEffect(() => {
        if(!currentTopic)
            return
        
        microAPI.get(`sensor-history?APIKEY=${123}&topic=${currentTopic}&period=${24}`)
        .then(response => {
            const microsserviceData = response.data
            
            let tempDataset = { 
                title: `Sensor Values at Topic ${currentTopic}`,
                data: [], 
                labels: []
            }

            microsserviceData.results.map((item, index) => {
                if(currentTopic.includes('temp')) 
                    tempDataset.data.push(item.temp)
                else if(currentTopic.includes('umid')) 
                    tempDataset.data.push(item.umid)
                tempDataset.labels.push(item.s)
            })

            setDataset(tempDataset)
            setErrorMessage(null)
        }).catch(err => {
            setErrorMessage("Error on reach data, Try Again Later!")
        })
        
    }, [currentTopic])

    return (
      <div className="HistoryPage">
          <Container>
            
            <Paper className="CustomPaper">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Devices History</Typography>
                        <Divider/>
                    </Grid>
                    
                    <Grid item xs={12} md={4} >
                        <Typography variant="h6" align="left">Select the Device</Typography>
                        <List>
                            { schema.room.sensors.temperature.map((sensorID, index) => 
                                    renderItem(TemperatureIcon, `${schema.room.id}/temp/${sensorID}`,
                                        `Temperature Sensor ${sensorID}`)) }

                            { renderItem(TemperatureIcon, `${schema.room.id}/temp/avg`, 
                                    'Temperature Sensors Average')} 

                            { schema.room.sensors.humidity.map((sensorID, index) => 
                                    renderItem(HumidityIcon, `${schema.room.id}/umid/${sensorID}`,
                                    `Humidity Sensor ${sensorID}`)) }

                            { renderItem(HumidityIcon, `${schema.room.id}/umid/avg`, 
                                    'Humidity Sensors Average')}  
                        </List>
                    </Grid>

                    <Grid item xs={12} md={8} ref={chartContainer}>
                        { chartContainer.current && currentTopic && dataset &&
                            <SensorChart width={chartWidth} height={chartHeight} dataset={dataset}/>
                        }

                        { errorMessage && 
                            <Alert severity="error">{errorMessage}</Alert>
                        }
                    </Grid>
                </Grid>
            </Paper>

          </Container>
      </div>
    );
}

export default HistoryPage;

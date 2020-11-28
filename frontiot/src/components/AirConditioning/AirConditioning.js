import React, {useState, useEffect} from 'react'
import SensorIcon from '../../img/ar-condicionado.svg'
import schema from '../../things_schema.json'

import { Paper, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell, TableContainer} from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';


function AirConditioningSensor(props) {

    const sensorPublishTopic = `${schema.team}/aircon/${props.sensorID}`
    const sensorSubscribeTopic = `${schema.team}/response`

    const [sensorValue, setSensorValue] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        props.client.subscribe(sensorSubscribeTopic)
        props.client.on('message', function (topic, message) {
            if(topic !== sensorSubscribeTopic)
                return        
            console.log("IN ", sensorSubscribeTopic, message.toString())
            setSensorValue(JSON.parse(message.toString()))
        });
    }, [])

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return(        
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Paper className="CustomPaper" elevation={3}>
                <Grid container spacing={2} alignItems="center">
                    
                    <Grid item xs={12}>
                        <img className="SensorIcon" src={SensorIcon} alt="temp"/>
                    </Grid>

                    <Grid item onClick={openDialog}>
                        <IconButton>
                        { !sensorValue["s"] && <WifiOffIcon className="StatusIcon" /> }
                        { sensorValue["s"] && <WifiIcon className="StatusIcon Subscribed" /> }
                        </IconButton>
                    </Grid>

                    <Grid item style={{ flexGrow: 1, textAlign: "left" }}>
                        <Typography variant="h6">
                            <strong>Air Condit. Sensor {props.sensorID}</strong>
                        </Typography>
                        <Typography><strong>Status:</strong> { sensorValue["0"] ? 'Device Connected' : 'No information available' }</Typography>
                        <Typography><strong>Temperature:</strong> { sensorValue["4"] || "unknown" } ºC </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={open} keepMounted onClose={closeDialog} fullWidth maxWidth="xs">
                <DialogTitle>
                    <Typography align="left" variant="h6"><strong>AirConditioning Sensor at {sensorSubscribeTopic}</strong></Typography>
                </DialogTitle>
                
                <DialogContent style={{ padding: 0 }} dividers>
                    <TableContainer>
                        <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>Status:</strong></TableCell>
                                <TableCell>{sensorValue["s"] ? 'Device Connected' : 'No information available'}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell><strong>Max Temperature:</strong></TableCell>
                                <TableCell>{sensorValue["1"] || "unknown"} ºC</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell><strong>Target Temperature:</strong></TableCell>
                                <TableCell>{sensorValue["4"] || "unknown"} ºC</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell><strong>Min Temperature:</strong></TableCell>
                                <TableCell>{sensorValue["2"] || "unknown"} ºC</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell><strong>Air Status:</strong></TableCell>
                                <TableCell>{sensorValue["21"]? "ON" : "OFF"}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell><strong>Last Command ID:</strong></TableCell>
                                <TableCell>{sensorValue["23"] || "unknown"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Publish Date:</strong></TableCell>
                                <TableCell>{sensorValue["s"] || "unknown"}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>

                <DialogActions dividers>
                    <Button onClick={closeDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

function AirConditioning(props) {
    return (
        <>
        { schema.room.sensors.airConditioning.map((sensorID, index) => 
            <AirConditioningSensor sensorID={sensorID} client={props.client} key={index} /> )
        }
        </>    
    )
}

export default AirConditioning
import React, {useState, useEffect} from 'react'
import SensorIcon from '../../img/movimento.svg';
import schema from '../../things_schema.json'

import { Paper, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell, TableContainer} from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';


function MovementSensor(props) {

    const sensorTopic = `${schema.room.id}/movimento/${props.sensorID}`
    const [sensorValue, setSensorValue] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        props.client.subscribe(sensorTopic)
        props.client.on('message', function (topic, message) {
            if(topic !== sensorTopic)
                return        
            console.log("IN ", sensorTopic, message.toString())
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
                        { !sensorValue["0"] && <WifiOffIcon className="StatusIcon" /> }
                        { sensorValue["0"] && <WifiIcon className="StatusIcon Subscribed" /> }
                        </IconButton>
                    </Grid>

                    <Grid item style={{ flexGrow: 1, textAlign: "left" }} minWid>
                        <Typography variant="h6">
                            <strong>Movement Sensor {props.sensorID}</strong>
                        </Typography>
                        <Typography><strong>Status:</strong> { sensorValue["0"] ? 'Device Connected' : 'No information available' }</Typography>
                        <Typography> <strong>Move at:</strong> {sensorValue["s"] || 'unknown' } </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={open} keepMounted onClose={closeDialog} fullWidth maxWidth="xs">
                <DialogTitle>
                    <Typography align="left" variant="h6"><strong>Movement Sensor at {sensorTopic}</strong></Typography>
                </DialogTitle>
                
                <DialogContent style={{ padding: 0 }} dividers>
                    <TableContainer>
                        <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>Status:</strong></TableCell>
                                <TableCell>{sensorValue["0"] ? 'Device Connected' : 'No information available'}</TableCell>
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
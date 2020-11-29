import React, { useState, useEffect } from 'react';
import './AirController.css';

import { Container, Grid, Typography, ButtonGroup, Button } from '@material-ui/core';
import { FormControlLabel, FormControl, InputLabel, Select, MenuItem, Switch, Slider } from '@material-ui/core';
import { SettingsRemoteIcon, SendIcon } from '@material-ui/icons';

function AirController(props){

    const [airMode, setAirMode] = useState(0)
    const [airStatus, setAirStatus] = useState(true)
    const [minTemp, setMinTemp] = useState(null)
    const [maxTemp, setMaxTemp] = useState(null)
    const [targetTemp, setTargetTemp] = useState(21)

    return (
        <Container style={{paddingTop: 24, paddingBottom: 24}}>
            <Typography variant="h5" gutterBottom> 
                <SettingsRemoteIcon/> Air Conditioning Controller 
            </Typography>
            
            <FormControl fullWidth style={{ marginBottom: 16 }}>
                <InputLabel>Select Operation Mode</InputLabel>
                <Select value={airMode} onChange={(e) => setAirMode(e.target.value)}>
                    <MenuItem value={0}>Manual</MenuItem>
                    <MenuItem value={1}>Automatic</MenuItem>
                </Select>
            </FormControl>  

            <Typography variant="h6" gutterTop gutterBottom>Air Conditioning Status</Typography>
            <ButtonGroup style={{ marginBottom: 16 }}>
                <Button variant={(airStatus) ? "contained" : "outlined"} color="primary" 
                    onClick={() => setAirStatus(1)}>AIR ON</Button>
                <Button variant={(!airStatus) ? "contained" : "outlined"} color="secondary" 
                    onClick={() => setAirStatus(0)}>AIR OFF</Button>
            </ButtonGroup>
            
            <Typography variant="h6" gutterBottom>Select Target Temperature (ºC)</Typography>
            <Slider style={{ marginBottom: 16 }}
                min={16} max={23} defaultValue={targetTemp} step={0.5}
                getAriaValueText={(v) => `${v} ºC`} marks
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                onChange={(e,value) => setTargetTemp(value)} />

            <Typography align="right">
                <Button variant="contained" color="primary" 
                    startIcon={<SendIcon />}>SEND UPDATES</Button>
            </Typography>


        </Container>
    )
}

export default AirController;
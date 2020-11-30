import React, { useState, useEffect } from 'react';
import './AirController.css';

import microApiFactory from '../../services/microsservice'

import { Container, Grid, Typography, ButtonGroup, Button } from '@material-ui/core';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Switch, Slider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import SendIcon from '@material-ui/icons/Send';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

function AirController(props){

    const [airMode, setAirMode] = useState("auto")
    const [airStatus, setAirStatus] = useState(1)
    const [minMaxTemp, setMinMaxTemp] = useState([16,23])
    const [targetTemp, setTargetTemp] = useState(21)

    const [errorMessage, setErrorMessage] = useState(null)

    const handleBoundaries = (event, value) => {
        if(value[0] > 22) value[0] = 22
        if(value[1] < 17) value[1] = 17
        setMinMaxTemp(value)
    }

    const getAirInformation = () => {
        const microAPI = microApiFactory()

        microAPI.get('air-information')
        .then(response => { 
            const apiData = response.data
            setAirMode(apiData.airMode)
            setAirStatus(apiData.airStatus)
            setMinMaxTemp([apiData.min, apiData.max])
            setTargetTemp(apiData.target)
            setErrorMessage(null)
        })
        .catch(err => { setErrorMessage("Error on reach API. Try Again Later!")})
    }

    const updateAirInformation = () => {
        let url = `set-temperature?APIKEY=${123}&airMode=${airMode}`

        if(airMode == "auto")
            url += `&min=${minMaxTemp[0]}&max=${minMaxTemp[1]}`
        else 
            url += `&target=${targetTemp}&airStatus=${airStatus}`
        
        const microAPI = microApiFactory()

        microAPI.post(url)
        .then(response => { setErrorMessage(null)})
        .catch(err => { setErrorMessage("Error on reach API. Try Again Later!")})
    }

    useEffect(() => {
        // Init States with info from API only in the first render
        getAirInformation()
    }, [])


    return (
        <Container style={{paddingTop: 24, paddingBottom: 24}}>
            <Typography variant="h5" gutterBottom> 
                <SettingsRemoteIcon/> Air Conditioning Controller 
            </Typography>
            
            <FormControl fullWidth style={{ marginBottom: 16 }}>
                <InputLabel>Select Operation Mode</InputLabel>
                <Select value={airMode} onChange={(e) => setAirMode(e.target.value)}>
                    <MenuItem value="manual">Manual</MenuItem>
                    <MenuItem value="auto">Automatic</MenuItem>
                </Select>
                <FormHelperText>*The Automatic Mode Turns the Air ON if the average 
                    temperature of the room is out the defined boundaries.</FormHelperText>
            </FormControl>  

            { airMode == "manual" && 
                <>
                <Typography variant="h6" gutterTop gutterBottom>Air Conditioning Status</Typography>
                <ButtonGroup style={{ marginBottom: 16 }}>
                    <Button variant={(airStatus) ? "contained" : "outlined"} color="primary" 
                        onClick={() => setAirStatus(1)}>AIR ON</Button>
                    <Button variant={(!airStatus) ? "contained" : "outlined"} color="secondary" 
                        onClick={() => setAirStatus(0)}>AIR OFF</Button>
                </ButtonGroup>
                
                <Typography variant="h6" gutterBottom>Select Target Temperature ({targetTemp}ºC)</Typography>
                <Slider style={{ marginBottom: 16 }}
                    min={16} max={23} defaultValue={targetTemp} step={0.5}
                    getAriaValueText={(v) => `${v} ºC`} marks
                    aria-labelledby="discrete-slider-custom"
                    valueLabelDisplay="auto"
                    onChange={(e,value) => setTargetTemp(value)} />
                </>
            }

            { airMode == "auto" && 
                <>
                <Typography variant="h6" gutterBottom>Select Boundaries ({minMaxTemp[0]} to {minMaxTemp[1]} ºC)</Typography>
                <Slider style={{ marginBottom: 16 }}
                    min={16} max={23} defaultValue={minMaxTemp} step={0.5}
                    getAriaValueText={(v) => `${v} ºC`} marks
                    aria-labelledby="discrete-slider-custom"
                    valueLabelDisplay="auto"
                    onChange={handleBoundaries} />
                </>
            }

            <Typography align="right" style={{ marginBottom: 12 }}>
                <Button variant="outlined" color="Secondary" style={{marginRight: 16 }} 
                    onClick={getAirInformation} startIcon={<RotateLeftIcon/>} >RESET CHANGES</Button>
                
                <Button variant="contained" color="primary" 
                    onClick={updateAirInformation} startIcon={<SendIcon/>} >SEND UPDATES</Button>
            </Typography>

            { errorMessage && 
                <Alert severity="error">{errorMessage}</Alert>
            }

        </Container>
    )
}

export default AirController;
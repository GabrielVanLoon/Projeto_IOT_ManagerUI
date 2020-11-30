import React from 'react';
import './LoginForm.css'

import { Link as RouterLink, Redirect} from "react-router-dom"

import { Link, Paper, withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Face, LockOutlined } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';


import api from "../../services/api";
import { login } from "../../services/auth";

const styles = theme => ({
    textConfiguration: {
        flexGrow: 1,
    }
});

class LoginForm extends React.Component {

    state = {
        username:   "",
        password:   "",
        error:      "",
        redirect:   false,
    };
    
    handleSubmit = async e => {
        e.preventDefault();

        if (!this.state.username || !this.state.password) {
            this.setState({ error: "Username and password required." });
            return
        }

        //alert(JSON.stringify({ username: this.state.username, password: this.state.password}))

        api.post('/api/auth', { username: this.state.username, password: this.state.password})
        .then(response => {
            const brokerData = response.data
            login(brokerData)
            this.setState({ error: "", redirect: true });
        }).catch(ErrorOutlineSharp => {
            this.setState({ error: "Invalid username or password." });
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className="CustomPaper">

                <form onSubmit={this.handleSubmit} >
                    
                    { this.state.redirect && 
                        <Redirect to="/devices" />
                    }
                    
                    { this.state.error && 
                        <Alert severity="error">{this.state.error}</Alert>
                    }

                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant="h5" color="primary" align="center">
                                SIGN IN
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Face/>
                        </Grid>
                        <Grid item className={classes.textConfiguration}>
                            <TextField id="username" label="Username" fullWidth autoFocus 
                                required onChange={e => this.setState({ username: e.target.value })} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockOutlined />
                        </Grid>
                        <Grid item className={classes.textConfiguration}>
                            <TextField id="password" label="Password" type="password" fullWidth 
                                required onChange={e => this.setState({ password: e.target.value })} />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={1} justify="center" >
                        <Grid item xs={12}>
                            <Button size="large" fullWidth variant="outlined" color="primary" type="submit"  
                                style={{ textTransform: "none" }}>Login</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center">
                                <Link component={RouterLink} to="/devices">Forgot the password? Click Here!</Link>
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={1} direction="row">
                        <Grid item xs={12}>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password?</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox color="primary" />
                            } label="Remember me" />
                        </Grid>
                    </Grid> */}
                
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginForm);
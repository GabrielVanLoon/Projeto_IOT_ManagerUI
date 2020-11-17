import React from 'react';
import './LoginForm.css'

import { Redirect } from "react-router-dom"
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, LockOutlined } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';

import api       from "../../services/api";
import { login } from "../../services/auth";


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
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
        const { username, password } = this.state;

        if (!username || !password) {
            this.setState({ error: "Username and password required." });
            return
        }

        api.post('api/auth', { username, password })
        .then(response => {
            const brokerData = response.data
            login(brokerData)
            this.setState({ error: "", redirect: true });
        }).catch(err => {
            this.setState({ error: "Invalid username or password." });
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>

                { this.state.redirect && 
                    <Redirect to="/home" />
                }
                
                { this.state.error && 
                    <Alert severity="error">{this.state.error}</Alert>
                }

                <form className={classes.container} onSubmit={this.handleSubmit} >
                    <Grid container alignItems="flex-end" justify="space-between">
                        <Grid item xs={1}>
                            <Face />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="username" label="Username" fullWidth autoFocus required onChange={e => this.setState({ username: e.target.value })} />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="flex-end" justify="space-between">
                        <Grid item  item xs={1}>
                            <LockOutlined />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="password" label="Password" type="password" fullWidth required onChange={e => this.setState({ password: e.target.value })} />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" justify="space-between">
                        <Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox color="primary" />
                            } label="Remember me" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    
                    <Grid container justify="center">
                        <Button type= "submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                        {/* <Button type= "submit" variant="contained" color="primary">Login</Button> */}
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginForm);
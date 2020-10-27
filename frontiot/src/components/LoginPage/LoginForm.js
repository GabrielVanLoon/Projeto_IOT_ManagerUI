import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint, LockOutlined } from '@material-ui/icons'
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        // console.log( 'Email:', email, 'Password: ', password); 
       // You should see email and password in console.
       // ..code to submit form to backend here...

    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <form className={classes.container} >
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Face />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <LockOutlined />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="password" label="Password" type="password" fullWidth required />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                    />
                                } label="Remember me" />
                            </Grid>
                            <Grid item>
                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button type= "submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                        </Grid>
                    </form>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginForm);
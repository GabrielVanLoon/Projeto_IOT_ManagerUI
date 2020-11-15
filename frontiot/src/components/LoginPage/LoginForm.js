import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint, LockOutlined } from '@material-ui/icons'
import api from "../../services/api";
import { login } from "../../services/auth";
import './LoginForm'

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
        username: "",
        password: "",
        error: ""
      };
    
      handleSubmit = async e => {
        e.preventDefault();
        const { username, password } = this.state;
        if (!username || !password) {
          this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
          try {
            const response = await api.post("/sessions", { username, password });
            login(response.data.token);
            this.props.history.push("/home");
          } catch (err) {
            this.setState({
              error:
                "Houve um problema com o login, verifique suas credenciais. T.T"
            });
          }
        }
      };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <form className={classes.container} onSubmit={this.handleSubmit} >
                    {this.state.error && <p>{this.state.error}</p>}
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Face />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" fullWidth autoFocus required onChange={e => this.setState({ username: e.target.value })} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <LockOutlined />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="password" label="Password" type="password" fullWidth required onChange={e => this.setState({ password: e.target.value })} />
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
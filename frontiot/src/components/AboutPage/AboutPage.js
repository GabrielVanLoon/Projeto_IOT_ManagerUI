import React from 'react';
import './AboutPage.css';

import { Container, Grid, Paper, Typography, Divider } from '@material-ui/core';

function AboutPage(props){
    return (
        <div className="AboutPage">
            <Container>
              <Paper className="CustomPaper">
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                            <Typography variant="h3" align="left" gutterBottom>About The Project</Typography>
                            <Typography align="left" gutterBottom>
                              Application developed for the final project of the Internet of Things discipline.
                              The project was divided into 5 groups, each responsible for one of the following layers: 
                              application, broker, microservices, storage and security.
                              The following is an introduction to the functions developed (For more information see the 
                              Github Repository).
                            </Typography>
                            
                            <Typography variant="h4" align="left" gutterBottom>Login Page</Typography>
                            <Typography align="left" gutterBottom>
                                To ensure that the access data to the broker and the microservice are not exposed, an 
                                authentication method was implemented that verifies that the user does indeed have the 
                                required level of access when providing a user and password. <br/>
                                This way, even if someone has the source code in the browser, it will not have any sensitive 
                                access information without first authenticating.
                            </Typography>

                            <Typography variant="h4" align="left" gutterBottom>Devices Page</Typography>
                            <Typography align="left" gutterBottom>
                                The devices page makes a direct connection to the MQTT broker and allows you to view the 
                                values ​​of the devices in real time. <br/>
                                If the device does not have any saved information, the connection icon will report that it 
                                was not possible to connect to the data. <br/>
                                The card of each device shows its current situation and the most important data depending 
                                on its semantics, but by clicking on the connection icon it is possible to obtain more 
                                information and control options (in the case of air conditioning).
                            </Typography>

                            <Typography variant="h4" align="left" gutterBottom>Device's History Page</Typography>
                            <Typography align="left" gutterBottom>
                                On the Device History page, you can check the recent history of values ​​saved on each device. The 
                                data is displayed in a graph that makes understanding more friendly and intuitive. <br/>
                                In addition, it is also possible to see the average value of all devices in the same category.
                            </Typography>

                      </Grid>
                      
                      
                  </Grid>
              </Paper>
  
            </Container>
        </div>
      );
  }
  
  export default AboutPage;
  
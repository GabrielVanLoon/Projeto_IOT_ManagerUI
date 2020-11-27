import React, { Component } from 'react';
import './LoginPage.css';

import LoginForm from './LoginForm';
import { Container } from '@material-ui/core';

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
          <Container>
            <LoginForm />
          </Container>

        {/* <div class="video-background">
            <div class="video-foreground">
            <iframe src="https://www.youtube.com/embed/i6sSc1BXVfU?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=i6sSc1BXVfU"
              frameborder="0" 
              allowfullscreen/>
        </div></div>
        <span className="videoShadow">&nbsp;</span> */}
      </div>
    );
  }
}

export default LoginPage;

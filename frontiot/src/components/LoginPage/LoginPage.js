import React, { Component } from 'react';
import './LoginPage.css';

import LoginForm from './LoginForm';

// Opções de background: 
// - i6sSc1BXVfU
// - hM7RR3ZzvCM

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">

        <div class="video-background">
            <div class="video-foreground">
          {/* <iframe src="https://www.youtube.com/embed/i6sSc1BXVfU?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=i6sSc1BXVfU" 
            frameborder="0" 
            allowfullscreen/> */}
          <iframe src="https://www.youtube.com/embed/i6sSc1BXVfU?controls=0&autoplay=1&loop=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div></div>

        <span className="videoShadow">&nbsp;</span>

        <LoginForm />

      </div>
    );
  }
}

export default LoginPage;

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="landingFrame">
        <div className="landingBox">
          <p>New to (app name here)?</p>
          <Link to="/auth">
            <p>Get Started</p>
          </Link>
        </div>
      </section>
    )
  }
}

export default Landing;
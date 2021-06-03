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
          <p className="boxText">New to (app name here)?</p>
          <Link to="/auth">
            <p className="linkText">Get Started</p>
          </Link>
        </div>
      </section>
    )
  }
}

export default Landing;
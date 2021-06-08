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
        <div className="designBox"></div>
        <div className="designBox2"></div>
        <div className="designBox3"></div>
        <div className="landingBox">
          <p className="boxText">New to Activity Tracker?</p>
          <Link className="linkDeco" to="/auth">
            <p className="linkText">Get Started</p>
          </Link>
        </div>
      </section>
    )
  }
}

export default Landing;
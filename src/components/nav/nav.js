import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './nav.css';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducer';
import { withRouter } from "react-router";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.isLoggedIn)
  }

  logout() {
    // console.log(this.props)
    axios.post("/api/auth/logout")
      .then(res => {
        this.props.logout();
        this.props.history.push("/")
      })
  }

  render() {
    const titleText = <p className='titleText'>Activity Tracker</p>
    const habitText = <p className='habitTitleText'>Your Activities</p>
    const indText = <p className='habitTitleText'>{this.props.indView ? this.props.selectedActivity.title : null}</p>

    const logInButtons =
      <section className='navRightBox'>
        <div className='navButtons'>
          <Link className="linkDeko" to="/auth">
            <p>Login</p>
          </Link>
          <Link className="linkDeko" Link to="/auth">
            <p>Register</p>
          </Link>
        </div>
      </section>

    const otherScreenButtons =
      <section className='navRightBox'>
        <div className='navButtons'>
          <Link className="linkDeko" to="/home">
            <p>Home</p>
          </Link>
          <Link className="linkDeko" to="/">
            <p onClick={this.logout}>Logout</p>
          </Link>
          <div className='navUserDisplay'>
            <p className='usernameBox'>{this.props.username}</p>
          </div>
        </div>
      </section>

    return (
      <section className='nav'>
        <div className='titleBox'>
          {this.props.activityPage ? (this.props.indView ? indText : habitText) : titleText}
          {/* {this.props.selectedActivity ? indText : null} */}
        </div>
        <div className='navToggleBox'>
          {this.props.isLoggedIn ? otherScreenButtons : logInButtons}
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    activityPage: state.activityPage,
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    selectedActivity: state.selectedActivity,
    indView: state.indView
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Nav));
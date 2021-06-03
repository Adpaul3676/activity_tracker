import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './nav.css';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducer';
import {withRouter} from "react-router";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout () {
    console.log(this.props)
    axios.post("/api/auth/logout")
    .then(res => {
      this.props.logout();
      this.props.history.push("/")
    })
  }

  render () {
    const titleText = <p className='titleText'>Activity Tracker</p>
    const habitText = <p className='habitTitleText'>Your Activities</p>

    const logInButtons =  
    <section className='navRightBox'>
      <div className='navButtons'>
        <Link className="linkDeco" to="/auth">
         <p>Login</p>
        </Link>
        <Link className="linkDeco" Link to="/auth">
          <p>Register</p>
        </Link>
      </div>
    </section>
    
    const otherScreenButtons =
    <section className='navRightBox'>
      <div className='navButtons'>
        <Link className="linkDeco" to="/home">
          <p>Home</p>
        </Link>
        <Link className="linkDeco" to="/">
          <p onClick={this.logout}>Logout</p>
        </Link>
        <div className='navUserDisplay'>
          <p>{this.props.username}</p>
        </div>
      </div>
    </section>

    return (
      <section className='nav'>
        <div className='titleBox'>
          {this.props.activityPage ? habitText : titleText}
        </div>
        <div className='navToggleBox'>
          {this.props.isLoggedIn ? otherScreenButtons : logInButtons}
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    activityPage: state.activityPage,
    isLoggedIn: state.isLoggedIn,
    username: state.username
  }
}

export default withRouter(connect(mapStateToProps, {logout})(Nav));
import React, {Component} from 'react';
import axios from 'axios';
import './auth.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../redux/reducer';
import {updatePage} from '../../redux/reducer';

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  
  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  login() {
    console.log(this.state);
    axios.post('/api/auth/login', this.state)
      .then(res => {
        console.log(res.data)
        this.props.updateUser(res.data)
        this.props.history.push("/home")
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Incorrect username or password!'})
      })
  }

  register() {
    axios.post('/api/auth/register', this.state)
      .then(res => {
        this.props.updateUser(res.data)
        this.props.history.push("/home")
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Username taken!'})
      })
  }

  closeErrorMessage = () => {
    this.setState({
      errorMsg: false, 
      username: '', 
      password: ''
    })
  }

  render () {
    return (
      <section className='authContainer'>
        <div className='authBG'>
          <div className='authLoginFrame'>
          {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>x</span></h3>}
            <div className='authInputFields'>
              <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} placeholder="username"></input>
              <input value={this.state.password} onChange={e => this.handleChange('password', e.target.value)} placeholder="password"></input>
            </div>
            <div className='authButtons'>
              {/* <Link to="/home"> */}
                <button onClick={this.login}>Login</button>
              {/* </Link> */}
              {/* <Link to="/home"> */}
                <button onClick={this.register}>Register</button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(null, {updateUser, updatePage})(Auth);
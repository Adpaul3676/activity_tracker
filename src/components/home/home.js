import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './home.css';
import {updateUser} from '../../redux/reducer';
import {updatePage} from '../../redux/reducer';


class Home extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   this.props.updatePage(true);
  // }

  render(){
    return(
      <section className="homeFrame">
        <section className="accBox">

        </section>
        <section className="habitBox">

        </section>
      </section>
    )
  }
}

export default connect(null, {updateUser, updatePage})(Home);
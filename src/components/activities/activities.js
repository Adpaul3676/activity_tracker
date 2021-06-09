import React, { Component } from 'react';
import './activities.css';
// import axios from 'axios';
import { connect } from 'react-redux';
import { updatePage } from '../../redux/reducer';
import CalendarComp from './calendarComp';

class Activities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageUpdate: {
        activityPage: true,
        indView: true,

      }
    }
  }

  componentDidMount() {
    this.props.updatePage(this.state.pageUpdate);
  }

  render() {

    // const 

    return (
      <section className='activityViewFrame'>
        <section className='calendarBox'>
          <CalendarComp />
        </section>
        <section>

        </section>
      </section>
    )
  }
}

export default connect(null, { updatePage })(Activities);
import React, { Component } from 'react';
import './activities.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updatePage } from '../../redux/reducer';
import CalendarComp from './calendarComp';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

class Activities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageUpdate: {
        activityPage: true,
        indView: true,
        value: "1 day",
        numValue: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumChange(input) {
    this.setState({ numValue: input })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    // axios.post("/api/message/setReminder", { activity_title, })
  }

  componentDidMount() {
    this.props.updatePage(this.state.pageUpdate);
  }

  render() {

    const options = ['one', 'two', 'three'];
    const defaultOption = options[0];

    return (
      <section className='activityViewFrame' >
        <section className='calendarBox'>
          <CalendarComp />
        </section>
        <section className='reminderFrame'>
          <form onSubmit={this.handleSubmit} className='formFrame'>
            <div className='actualFormatting'>
              <p>Set a reminder here!</p>
              <input className='utilityInput' placeholder="phone number"></input>
              <select className='utilityStuff' value={this.state.value} onChange={this.handleChange}>
                <option value="3600000">1 hour</option>
                <option value="21600000">6 hours</option>
                <option value="43200000">12 hours</option>
                <option value="86400000">1 day</option>
                <option value="172800000">2 days</option>
                <option value="259200000">3 days</option>
                <option value=" 604800000">1 week</option>
              </select>
              <p>Recurring Reminder?</p>
              {/* <input></input> */}
              <select className='utilityStuff' value={this.state.value} onChange={this.handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <p className="outOfPlace">We'll send you a text at the selected time!</p>
          </form>
        </section>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedActivity: state.selectedActivity
  }
}

export default connect(mapStateToProps, { updatePage })(Activities);
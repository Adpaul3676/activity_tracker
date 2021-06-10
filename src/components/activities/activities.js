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
        // numValue: null
      },
      activityTitle: null,
      value: "3600000",
      recurringBool: false,
      phone: null
    }
    this.handleBoolChange = this.handleBoolChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handlePhoneChange(input) {
    this.setState({ phone: input });
  }

  handleBoolChange(input) {
    this.setState({ recurringBool: input })
  }

  handleChange(input) {
    // console.log(input);
    this.setState({ value: input })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("here");
    console.log(this.state);
    axios.post("/api/message/setReminder", { activity_title: this.state.activityTitle, number: this.state.phone, timeout: this.state.value })
  }

  componentDidMount() {
    this.props.updatePage(this.state.pageUpdate);
    axios.get(`/api/single/getActivity/${this.props.selectedActivity.activity_id}`).then((res) => {
      // console.log(res.data);
      this.setState({ activityTitle: res.data[0].title })
    })
  }

  render() {

    // const options = ['one', 'two', 'three'];
    // const defaultOption = options[0];

    return (
      <section className='activityViewFrame' >
        <section className='calendarBox'>
          <CalendarComp />
        </section>
        <section className='reminderFrame'>
          <form onSubmit={this.handleSubmit} className='formFrame'>
            <div className='actualFormatting'>
              <p>Set a reminder here!</p>
              <input className='utilityInput' placeholder="phone number" onChange={(e) => { this.handlePhoneChange(e.target.value) }}></input>
              <select className='utilityStuff' value={this.state.value} onChange={(e) => { this.handleChange(e.target.value) }}>
                <option value="1000">1 second (for testing)</option>
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
              <select className='utilityStuff' value={this.state.recurringBool} onChange={(e) => { this.handleBoolChange(e.target.value) }}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
              <button className="submitButton" type='submit'>Create</button>
            </div>
            <p className="outOfPlace">We'll send you a message at the selected time!</p>
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
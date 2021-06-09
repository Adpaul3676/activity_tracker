import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import { updateActivity } from '../../redux/reducer';
import { updatePage } from '../../redux/reducer';


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
      filteredAct: [],
      showFiltered: false,
      accArr: [],
      pageChange: {
        activityPage: true,
        indView: false
      },
      showAddActivity: false,
      titleInput: ''
    }

    this.filterActivities = this.filterActivities.bind(this);
    this.toggleActivityView = this.toggleActivityView.bind(this);
    this.createNewActivity = this.createNewActivity.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  componentDidMount() {
    axios.get("/api/home/activities")
      .then(res => {
        this.setState({ accArr: res.data })
      }).catch(err => { console.log(err) })
    this.props.updatePage(this.state.pageChange);
  }

  toggleActivityView() {
    this.setState({ showAddActivity: !this.state.showAddActivity });
  }

  createNewActivity(input) {
    axios.post("/api/home/createActivity", { title: input })
      .then(res => {
        this.setState({ accArr: res.data, showAddActivity: !this.state.showAddActivity })
      }).catch(err => { console.log(err) });
  }

  filterActivities(input) {
    this.setState({ showFiltered: !this.state.showFiltered })
    let filtered = this.state.accArr.filter((e) => {
      if (e.title.toUpperCase().includes(input.toUpperCase()) === true) {
        return (e)
      }
    })
    this.setState({ filteredAct: filtered })
    this.setState({ userInput: '' })
  }

  render() {

    let newActivityInput =
      <section className="addActivityFrame">
        <section className="justForCSS">
          <input className="newAccInput" placeholder="Title here" value={this.state.titleInput} onChange={e => this.handleChange('titleInput', e.target.value)}></input>
          <button className="newAccSubmit" onClick={() => { this.createNewActivity(this.state.titleInput) }}>Create</button>
        </section>
      </section>

    let accArr = this.state.accArr.map((e) => {
      if (this.state.showFiltered === false && this.state.showAddActivity === false) {
        // console.log(e.activity_id)
        return (
          <section className="homeActivityBlock">
            <section className='specificButtonContainer'>
              <Link className="mistakeClass" to={`/activities/:${e.activity_id}`}>
                <button className='specificButtons' key={e.activity_id} onClick={() => this.props.updateActivity(e)}>
                  {e.title}
                </button>
              </Link>
            </section>
            <section className="dayButtonContainer">
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
            </section>
          </section>
        )
      }
    })

    let filteredAccArr = this.state.filteredAct.map((e) => {
      if (this.state.showFiltered === true && this.state.showAddActivity === false) {
        return (
          <section className="homeActivityBlock">
            <section className='specificButtonContainer'>
              <Link className="mistakeClass" to={`/activities/:${e.activity_id}`}>
                <button className='specificButtons' key={e.activity_id} onClick={() => this.props.updateActivity(e)}>
                  {e.title}
                </button>
              </Link>
            </section>
            <section className="dayButtonContainer">
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
              <button className="dayOfTheWeek"></button>
            </section>
          </section>
        )
      }
    })

    return (
      <section className="homeFrame">
        <section className="utilityBox">
          <section className='searchAndButtons'>
            <input className="homeSearch" value={this.state.userInput} placeholder="Filter activities" onChange={e => this.handleChange('userInput', e.target.value)}></input>

            <button className='searchButton' onClick={() => { this.filterActivities(this.state.userInput) }}>{this.state.showFiltered ? "Back" : "Search"}</button>

            <button className='addButton' onClick={this.toggleActivityView}>{this.state.showAddActivity ? "Back" : "New Activity"}</button>
          </section>

          <div className='daysOfTheWeekDisplay'>
            <div className='dayHeader'>Sun</div>
            <div className='dayHeader'>Mon</div>
            <div className='dayHeader'>Tue</div>
            <div className='dayHeader'>Wed</div>
            <div className='dayHeader'>Thu</div>
            <div className='dayHeader'>Fri</div>
            <div className='dayHeader'>Sat</div>
          </div>
        </section>
        <div className='dividerLine'></div>
        <section className="accBox">
          {accArr}
          {filteredAccArr}
          {this.state.showAddActivity ? newActivityInput : null}
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

export default connect(mapStateToProps, { updateActivity, updatePage })(Home);
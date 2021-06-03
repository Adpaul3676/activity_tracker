import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './home.css';
import {updateActivity} from '../../redux/reducer';


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
      filteredAct: [],
      showFiltered: false,
      accArr: []
    }
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  componentDidMount() {
    axios.get("/api/home/activities")
    .then(res => {
      this.setState({accArr: res.data})
    }).catch(err => {console.log(err)})
  }

  filterActivities(input) {
    this.setState({showFiltered: !this.state.showFiltered})
    let filtered = this.state.accArr.filter((e) => {
      if (e.title.includes(input) === true) {
        return (e)  
      }
    })
    this.setState({filteredNotesArray: filtered})
    this.setState({userInput: ''})
  }

  render(){

    let accArr = this.state.accArr.map((e) => {
      if (this.state.showFiltered === false) {
        return (
        <button className='specificButtons' key={e.id} onClick={() => this.props.updateActivity(e)}>
        {e.title}
        </button>
      )}
    })

    let filteredAccArr = this.state.filteredAct.map((e) => {
      if (this.state.showFiltered === true) {
        return (
        <button className='specificButtons' key={e.id} onClick={() => this.props.updateActivity(e)}>
        {e.title}
        </button>
      )}
    })

    return(
      <section className="homeFrame">
        <section className="utilityBox">
          <input className="homeSearch" value={this.state.userInput} placeholder="Filter activities" onChange={e => this.handleChange('userInput', e.target.value)}></input>

          <button className='addButton'>New Activity</button>

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
        <section className="accBox">
          {accArr}
          {filteredAccArr}
        </section>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    selectedActivity: state.selectedActivity
  }
}

export default connect(mapStateToProps, {updateActivity})(Home);
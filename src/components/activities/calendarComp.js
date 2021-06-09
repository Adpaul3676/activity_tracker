import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import './activities.css';
import { connect } from 'react-redux';
// import { selectedActivity } from '../../redux/reducer';

function CalendarComp(props) {
  const [dateState, setDateState] = useState(new Date())
  const [completed, setCompleted] = useState([])
  // const activity_id = props.selectedActivity.activity_id;

  // const completedDisplay = completed.map((e) => {
  //   // console.log(completed)
  //   return (
  //     <section className="dateDisplay" key={`${e}`}>
  //       <p>{e}</p>
  //     </section>
  //   )
  // })

  const changeDate = (e) => {
    setDateState(e)
  }

  useEffect(() => {
    console.log(props.selectedActivity.activity_id);
    axios.get('/api/completion/getCompleted', { params: { activity_id: props.selectedActivity.activity_id } })
      .then((res) => {
        // for(let i = 0; i < res.data.length; i++) {
        //   completed.push(res.data[i].date);
        // }
        // console.log(res);
        setCompleted(res.data.map(e => e.date));
      })
  }, [])

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (completed.find(element => element === moment(dateState).format('MM-DD-YYYY') ? true : false)) {
        // return 'highlight';
      }
    }
  }

  function onClickDay(value) {
    const date = moment(value).format("MM-DD-YYYY");
    console.log(value);
    axios.post('/api/completion/createCompleted', { activity_id: props.selectedActivity.activity_id, title: props.selectedActivity.title, date: date })
      .then((res) => {
        setCompleted(res.data.map(e => e.date))
      })
    // pushDateToCompleted(date);
  }

  // function pushDateToCompleted(date) {
  //   if (completed.includes(`${date}`) === false) {
  //     setCompleted((oldArr) => [...oldArr, `${date}`])
  //     // completed.push(`${date}`);
  //   } else {
  //     setCompleted(completed.filter((e) => e !== `${date}`))
  //     // let index = completed.findIndex((element) => element === `${date}`);
  //     // completed.splice(index, 1);
  //   }
  //   console.log(completed)
  // }

  return (
    <section className='calendarFrame'>
      <Calendar
        value={dateState}
        onChange={changeDate}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
      // tileContent={tileContent}
      />
      <section className='placeHolder'>
        <p className="datesCompletedTitle">Days Completed:</p>
        <div className="datesCompleted">
          {
            completed.map((e) => {
              // console.log(completed)
              return (
                <section className="dateDisplay" key={`${e}`}>
                  <p>{e}</p>
                </section>
              )
            })}
        </div>
      </section>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    selectedActivity: state.selectedActivity
  }
}

export default connect(mapStateToProps)(CalendarComp);
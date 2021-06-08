import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';

function CalendarComp(props) {
  const [dateState, setDateState] = useState(new Date())
  const [completed, setCompleted] = useState([])

  const completedDisplay = completed.map((e) => {
    // console.log(completed)
    return (
      <section className="dateDisplay" key={`${e}`}>
        <p>{e}</p>
      </section>
    )
  })

  const changeDate = (e) => {
    setDateState(e)
  }

  useEffect(() => {
    axios.get('/api/completion/getCompleted')
      .then((res) => {
        // for(let i = 0; i < res.data.length; i++) {
        //   completed.push(res.data[i].date);
        // }
        setCompleted(res.data.map(e => e.date));
      })
  })

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (completed.find(element => element === moment(dateState).format('MM-DD-YYYY') ? true : false)) {
        return 'highlight';
      }
    }
  }

  function onClickDay(value) {
    const date = moment(value).format("DD-MM-YYYY");
    // console.log(event.target.value);
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
    <section>
      <Calendar
        value={dateState}
        onChange={changeDate}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
      // tileContent={tileContent}
      />
      <section>
        <p>Completed Dates:</p>
        {
          completed.map((e) => {
            // console.log(completed)
            return (
              <section className="dateDisplay" key={`${e}`}>
                <p>{e}</p>
              </section>
            )
          })}
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
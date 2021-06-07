import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePage} from '../../redux/reducer';

class Activities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageUpdate: {
        activityPage: true,
        indView: true
      }
    }
  }

  componentDidMount(){
    this.props.updatePage(this.state.pageUpdate);
  }
  
  render() {
    return(
      <section>
        
      </section>
    )
  }
}

export default connect(null, {updatePage})(Activities);
import React, { Component } from 'react';
import * as M from 'materialize-css';

import '../../css/intervention.css';

type State = {
  receiveTime: String,
  arrivalTime: String,
  departureTime: String,
  interventionStatus: String,
}

class InterventionInfo extends Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      receiveTime: '',
      arrivalTime: '',
      departureTime: '',
      interventionStatus: '',
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.timepicker');
      const options = {};
      const instances = M.Timepicker.init(elems, options);
    });
  }

  handleReceiveTimeChange = (e) => {
    //
  };

  handleArrivalTimeChange = (e) => {
    //
  };

  handleDepartureTimeChange = () => {
    //
  };

  handleinterventionStatusChange = (e) => {
    //
  };

  render() {
    return (
      <div className="row">
        <div className="col s10 m8 l6 offset-l4 offset-m3 custom--margin">
          <form action="">
            <div className="input-field">
              <input id="receiveTime"
                     type="text"
                     className="timepicker validate"
                     required/>
              <label htmlFor="receiveTime">
                Receiving time
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="arrivalTime"
                     type="text"
                     className="timepicker validate"
                     required/>
              <label htmlFor="arrivalTime">
                Arrival time
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="departureTime"
                     type="text"
                     className="timepicker validate"
                     required/>
              <label htmlFor="departureTime">
                Departure time
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="interventionStatus"
                     type="text"
                     className="validate"
                     required/>
              <label htmlFor="interventionStatus">
                Intervention status
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default InterventionInfo;

import React, { Component } from 'react';
import * as M from 'materialize-css';

import '../../../css/intervention.css';

type State = {
  accidentLocation: String,
  unloadingLocation: String,
  carStatus: String,
  carStatusDesc: String,
}

class AccidentInfo extends Component<State> {
  constructor(props) {
    super(props);

    this.state = {
      accidentLocation: '',
      unloadingLocation: '',
      carStatus: '',
      carStatusDesc: '',
    }
  }

  componentDidMount() {
    M.textareaAutoResize(document.querySelector('.materialize-textarea'))
  }

  handleAccidentLocationChange = (e) => {
    this.setState({ accidentLocation: e.target.value });
  };

  handleUnloadingLocationChange = (e) => {
    this.setState({ registrationPlate: e.target.value });
  };

  handleCarStatusChange = (e) => {
    this.setState({ carStatus: e.target.value });
  };

  handleCarStatusDescChange = (e) => {
    this.setState({ registrationPlate: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">
          <form action="">
            <div className="input-field">
              <input id="accidentLocation"
                     type="text"
                     className="validate"
                     onChange={this.handleAccidentLocationChange}
                     required/>
              <label htmlFor="sessionNumber">
                Lokacija nesreće
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="unloadingLocation"
                     type="text"
                     className="validate"
                     onChange={this.handleUnloadingLocationChange}
                     required/>
              <label htmlFor="registrationPlate">
                Lokacija istovara
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div  className="input-field">
              <input id="carStatus"
                     type="text"
                     className="validate"
                     onChange={this.handleCarStatusChange}
                     required/>
              <label htmlFor="carStatus">
                Status vozila
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div  className="input-field">
              <textarea id="carManufacturer"
                        className="materialize-textarea validate"
                        onChange={this.handleCarStatusDescChange}
                        required>
              </textarea>
              <label htmlFor="carManufacturer">
                Opis nesreće
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

export default AccidentInfo;

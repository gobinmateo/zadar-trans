import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { socket } from '../../index';
import API from '../../Api';

import Store from '../../stores/Store';

type State = {
  name: String,
  surname: String,
  phoneNumber: String,
  insurancePolicyNumber: String
}

let id = 185;

@inject('Store')
@observer
class UserInformation extends Component<State> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSurnameChange = (e) => {
    this.setState({ surname: e.target.value })
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value })
  };

  handleInsurancePolicyNumberChange = (e) => {
    this.setState({ insurancePolicyNumber: e.target.value })
  };

  handleFinishClick = async () => {
    const { Store, history } = this.props;
    const { name, surname, phoneNumber, insurancePolicyNumber } = this.state;
    const victimName = `${name} ${surname}`;
    const newIntervention = true;

    // add intervention to database
    await API.post('/interventions', { id, victimName, phoneNumber, insurancePolicyNumber });
    // add intervention to global store
    Store.addIntervention(this.state);
    // send notification to other users
    socket.emit('INTERVENTION_NOTIFICATION', {
      newIntervention
    });
    socket.emit('SEND_INTERVENTION', {
      id
    });
    id += 1;
    // switch to front page
    history.push('/');
  };

  render() {
    return (
      <div className="row">
        <div className="col s10 m8 l6 offset-l3 offset-m2">
          <form action="">
            <div className="input-field">
              <input id="name"
                     type="text"
                     className="validate"
                     onChange={this.handleNameChange}
                     required/>
              <label htmlFor="name">
                Name
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="surname"
                     type="text"
                     className="validate"
                     onChange={this.handleSurnameChange}
                     required/>
              <label htmlFor="surname">
                Surname
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="phoneNumber"
                     type="text"
                     className="validate"
                     onChange={this.handlePhoneNumberChange}
                     required/>
              <label htmlFor="phoneNumber">
                Phone number
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="insurancePolicyNumber"
                     type="text"
                     className="validate"
                     onChange={this.handleInsurancePolicyNumberChange}
                     required/>
              <label htmlFor="insurancePolicyNumber">
                Insurance policy number
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field right">
              <a onClick={this.handleFinishClick} className="btn blue-grey darken-3">Finish</a>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default withRouter(UserInformation);

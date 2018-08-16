import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import 'react-dropdown/style.css'
import Store from '../../../Store/Store';
import '../../../css/intervention.css';

type State = {
  name: String,
  surname: String,
  phoneNumber: String,
  insurancePolicyNumber: String
}

@inject('Store')
@observer
class UserInformation extends Component<State> {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: ''
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

  render() {
    const { isLoading } = this.state;

    return (
      <div className="row">
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">
          <form action="">
            <div className="input-field">
              <input id="name"
                     type="text"
                     className="validate"
                     onChange={this.handleNameChange}
                     required/>
              <label htmlFor="name">
                Ime
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
                Prezime
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
                Broj mobitela
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="insurancePolicyNumber"
                     type="number"
                     className="validate"
                     onChange={this.handleInsurancePolicyNumberChange}
                     required/>
              <label htmlFor="insurancePolicyNumber">
                Broj police osiguranja
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

export default withRouter(UserInformation);

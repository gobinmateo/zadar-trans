import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import Store from '../../stores/Store';

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

  handleFinishClick = () => {
    const { Store } = this.props;
    const { history } = this.props;
    Store.addIntervention(this.state);
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

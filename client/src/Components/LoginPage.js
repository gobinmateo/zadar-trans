import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import API from '../Api';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const StyledDiv = styled.div`
  margin-top: 50px;
`;

type State = {
  email: String,
  password: String
};

@inject('Store')
@observer
class LoginPage extends Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: 200
    }
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    const { history } = this.props;
    const { email, password} = this.state;

    try {
      const response = await API.post('/auth/login', {
        email: email,
        password: password
      });

      if(response.status === 200) {
        console.log('LOGIN SUCCESSFUL')
        this.props.Store.login(true);
        history.push('/');

        if(response.data.token) {
          console.log('TOKEN ACQUIRED')
          Cookies.set('token', response.data.token);
          //document.cookie = `token=${ response.data.token }`;
        }
      }
    } catch(error) {
      alert(error.response.data.message);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row center">
          <StyledDiv className="col s10 l6 m18 push-l3 push-m1 push-s1 custom--border">
            <form action="">
              <div className="input-field">
                <i className="material-icons prefix">
                  account_circle
                </i>
                <input id="email"
                       type="email"
                       className="validate"
                       onChange={this.handleEmailChange}
                       required/>
                <label htmlFor="email">
                  Email
                </label>
                <span className="helper-text"
                      data-error="Invalid email format"/>
              </div>

              <div className="input-field">
                <i className="material-icons prefix">
                  vpn_key
                </i>
                <input id="password"
                       type="password"
                       className="validate"
                       onChange={this.handlePasswordChange}
                       required/>
                <label htmlFor="password">
                  Password
                </label>
                <span className="helper-text"
                      data-error="Password field is required"/>
              </div>
              <div className="input-field right">
                <button className="btn blue-grey darken-3"
                        onClick={this.handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </StyledDiv>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);

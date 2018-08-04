import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-top: 50px;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value })
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password} = this.state;

    const connection = axios.create({
      baseURL: 'http://localhost:8080',
    });

    await connection.post('/', {
      data: {
        email: email,
        password: password,
      },
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s2 m4 l3">
          </div>
          <StyledDiv className="col s10 m8 l6 center">
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
                      data-error="Invalid email"/>
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
                      data-error="Invalid password"/>
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
    )
  }
}

export default LoginPage;

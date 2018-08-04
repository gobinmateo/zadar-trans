import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleLogin = async () => {
    const connection = axios.create({
      baseURL: 'http://localhost:8080',
    });

    let resp = await connection.post('/', {
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    });

    console.log(resp);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s2 m4 l3">
          </div>
          <div className="col s10 m8 l6 center">
            <form action="">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input id="email" type="text" className="validate"/>
                <label htmlFor="email">
                  Email
                </label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">vpn_key</i>
                <input id="password" type="password" className="validate"/>
                <label htmlFor="password">
                  Password
                </label>
              </div>
              <div className="input-field right">
                <button className="btn blue-grey darken-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage;

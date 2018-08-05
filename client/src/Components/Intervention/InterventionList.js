import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Store from '../../stores/Store';
import { socket } from '../../index';

@inject('Store')
@observer
class InterventionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: ''
    };
  }

  componentDidMount() {
    socket.on('RECEIVE_INTERVENTION', (data) => {
      this.setState({ name: data.name, surname: data.surname });
    });
  }

  render() {
    const { name, surname} = this.state;
    return (
      <div>
        <div className="row">
          <div className="col s6 m4 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Int 1</span>
                <p> BLABLABLA </p>
              </div>
            </div>
          </div>
          <div className="col s6 m4 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Int 1</span>
                <p> BLABLABLA </p>
              </div>
            </div>
          </div>
          <div className="col s6 m4 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Int 1</span>
                <p> BLABLABLA </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterventionList;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Store from '../../stores/Store';

@inject('Store')
@observer
class InterventionList extends Component {
  render() {
    const { Store } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 m6 l3">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Int 1</span>
                <p> {`Ime: ${Store.intervention.name}, Prezime: ${Store.intervention.surname}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterventionList;

import React, { Component } from 'react';
import * as M from 'materialize-css';
import styled from 'styled-components';

import UserInformation from './UserInformation';
import VehicleInformation from './VehicleInformation';
import InterventionInfo from './InterventionInfo';

const Ul = styled.ul`
  height: 100% !important; 
  display: flex;
  flex-direction: column;
`;

class Intervention extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const elem = document.querySelector('.tabs');
    const options = {}
    const instance = M.Tabs.init(elem, options);
  }

  render() {
    return (
      <div className="row">
        <div className="col l2 m6">
        </div>
        <div className="col l10 m6">
          <p className="left-align blue-grey-text text-darken-1"> NEW INTERVENTION </p>
          <div className="divider"/>
        </div>
        <div className="tabs-vertical">
          <div className="col s4 m3 l2">
            <Ul className="tabs blue-grey-text text-darken-1">
              <li className="tab">
                <a className="active" href="#test1">Intervention info</a>
              </li>
              <li className="tab">
                <a href="#test2">User info</a>
              </li>
              <li className="tab">
                <a href="#test3">Vehicle information</a>
              </li>
              <li className="tab">
                <a href="#test4">Accident information</a>
              </li>
              <li className="tab">
                <a href="#test5">Payment</a>
              </li>
            </Ul>
          </div>
          <div className="col s8 m9 l6">
            <div id="test1" className="tab-content"><InterventionInfo /></div>
            <div id="test2" className="tab-content"><UserInformation /></div>
            <div id="test3" className="tab-content"><VehicleInformation /></div>
            <div id="test4" className="col s12">IJK</div>
            <div id="test5" className="col s12">LMN</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intervention;

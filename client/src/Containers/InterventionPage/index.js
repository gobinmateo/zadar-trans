import React, { Component } from 'react';
import * as M from 'materialize-css';
import { inject, observer } from 'mobx-react';

import ClientInfo from '../../Components/Intervention/ClientInfo';
import VehicleInfo from '../../Components/Intervention/VehicleInfo';
import InterventionInfo from '../../Components/Intervention/InterventionInfo';
import AccidentInfo from '../../Components/Intervention/AccidentInfo';
import PaymentInfo from '../../Components/Intervention/PaymentInfo';

import styled from 'styled-components';

const Ul = styled.ul`
  height: 100% !important;
  display: flex;
  flex-direction: column;
`;

@inject('Store')
@observer
class InterventionPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const elem = document.querySelector('.tabs');
    const options = {}
    const instance = M.Tabs.init(elem, options);
  }

  render() {
    const { _id } = this.props.Store.intervention;

    return (
      <div className="row">
        <div className="col l2 m4">
        </div>
        <div className="col l10 m8 s12">
          <p className="left-align blue-grey-text text-darken-1"> Slučaj { _id } </p>
          <div className="divider"/>
        </div>
        <div className="tabs-vertical">
          <div className="col s12 m4 l2">
            <Ul className="tabs blue-grey-text text-darken-1">
              <li className="tab">
                <a className="active" href="#test1">Intervencija</a>
              </li>
              <li className="tab">
                <a href="#test2">Klijent</a>
              </li>
              <li className="tab">
                <a href="#test3">Vozilo</a>
              </li>
              <li className="tab">
                <a href="#test4">Nesreća</a>
              </li>
              <li className="tab">
                <a href="#test5">Napomene</a>
              </li>
            </Ul>
          </div>
          <div className="col s9 m8 l10 offset-s1">
            <div id="test1" className="tab-content"><InterventionInfo /></div>
            <div id="test2" className="tab-content"><ClientInfo /></div>
            <div id="test3" className="tab-content"><VehicleInfo /></div>
            <div id="test4" className="tab-content"><AccidentInfo /></div>
            <div id="test5" className="col s12"><PaymentInfo /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default InterventionPage;

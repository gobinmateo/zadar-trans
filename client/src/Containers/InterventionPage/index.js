import React, { Component } from 'react';
import * as M from 'materialize-css';
import { inject, observer } from 'mobx-react';

import ClientInfo from '../../Components/Intervention/ClientInfo';
import VehicleInfo from '../../Components/Intervention/VehicleInfo';
import InterventionInfo from '../../Components/Intervention/InterventionInfo';
import AccidentInfo from '../../Components/Intervention/AccidentInfo';
import PaymentInfo from '../../Components/Intervention/PaymentInfo';

import API from '../../Api';

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

    this.Store = this.props.Store;

    this.state = {
      _id: this.props.match.params.id
    };
  }

  loadInterventionData(source) {
    console.log('source ', source)
    this.setState({
      accidentLocation: source.accidentLocation,
      additionalVehicleInfo: source.additionalVehicleInfo,
      chassisNumber: source.chassisNumber,
      checkoutRemark: source.checkoutRemark,
      company: source.company,
      dischargeLocation: source.dischargeLocation,
      firstRegistrationDate: source.firstRegistrationDate,
      insurancePolicyNumber: source.insurancePolicyNumber,
      interventionArrivalDateTime: source.interventionArrivalDateTime,
      interventionCompletionDateTime: source.interventionCompletionDateTime,
      interventionRecievalDateTime: source.interventionRecievalDateTime,
      interventionStatus: source.interventionStatus,
      partner: source.partner,
      paymentMethod: source.paymentMethod,
      peopleCount: source.peopleCount,
      phoneNumber: source.phoneNumber,
      registrationPlate: source.registrationPlate,
      remark: source.remark,
      vehicleModel: source.vehicleModel,
      vehicleStatus: source.vehicleStatus,
      victimName: source.victimName
    });
  }

  async componentDidMount() {
    const elem = document.querySelector('.tabs');
    const options = {}
    const instance = M.Tabs.init(elem, options);

    const response = await API.get(`/interventions/${this.state._id}`);

    this.loadInterventionData(response.data);
  }

  render() {
    const { _id } = this.state;

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
            <div id="test1" className="tab-content">
              <InterventionInfo
                interventionRecievalDateTime={this.state.interventionRecievalDateTime}
                interventionArrivalDateTime={this.state.interventionArrivalDateTime}
                interventionCompletionDateTime={this.state.interventionCompletionDateTime}
                interventionStatus={this.state.interventionStatus}
                partner={this.state.partner}
                model={this.state.model}/>
            </div>
            <div id="test2" className="tab-content">
              <ClientInfo />
            </div>
            <div id="test3" className="tab-content">
              <VehicleInfo />
            </div>
            <div id="test4" className="tab-content">
              <AccidentInfo />
            </div>
            <div id="test5" className="col s12">
              <PaymentInfo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InterventionPage;

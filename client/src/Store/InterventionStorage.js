import { extendObservable, observable } from 'mobx';

export class InterventionStorage {
  @observable accidentLocation = '';
  @observable additionalVehicleInfo = '';
  @observable chassisNumber = '';
  @observable checkoutRemark = '';
  @observable company = '';
  @observable dischargeLocation = '';
  @observable firstRegistrationDate = '';
  @observable _id = '';
  @observable insurancePolicyNumber = '';
  @observable interventionArrivalDateTime = '';
  @observable interventionCompletionDateTime = '';
  @observable interventionRecievalDateTime = '';
  @observable interventionStatus = '';
  @observable partner = '';
  @observable paymentMethod = '';
  @observable peopleCount = '';
  @observable phoneNumber = '';
  @observable registrationPlate = '';
  @observable remark = '';
  @observable vehicleModel = '';
  @observable vehicleStatus = '';
  @observable victimName = '';

  constructor() {
    extendObservable(this, {
      accidentLocation: '',
      additionalVehicleInfo: '',
      chassisNumber: '',
      checkoutRemark: '',
      company: '',
      dischargeLocation: '',
      firstRegistrationDate: '',
      _id: '',
      insurancePolicyNumber: '',
      interventionArrivalDateTime: '',
      interventionCompletionDateTime: '',
      interventionRecievalDateTime: '',
      interventionStatus: '',
      partner: '',
      paymentMethod: '',
      peopleCount: '',
      phoneNumber: '',
      registrationPlate: '',
      remark: '',
      vehicleModel: '',
      vehicleStatus: '',
      victimName: ''
    })
  }
}

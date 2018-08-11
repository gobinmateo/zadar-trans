import { extendObservable, observable } from 'mobx';

export class InterventionStorage {
  @observable name = '';
  @observable surname = '';
  @observable phoneNumber = '';
  @observable insurancePolicyNumber = '';

  constructor() {
    extendObservable(this, {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: ''
    })
  }
}

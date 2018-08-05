import { action, observable } from 'mobx';
import { InterventionStorage } from './InterventionStorage';

class Store {
  @observable intervention = new InterventionStorage();

  @action
  addIntervention(info) {
    for (const prop in info) {
      this.intervention[prop] = info[prop];
    }
  }
}

export default new Store();

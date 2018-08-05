import { action, observable } from 'mobx';

class Store {
  @observable theme = 'day';
  @action
  toggleTheme = () => {
    this.theme = this.theme == 'day' ? 'night' : 'day';
  };
}

export default new Store();

export class ConfigService {
  constructor () {
    'ngInject';
    this.defaultConfig = {
        'freePerMonth': '7',
        'holidaysPerWeek': [0,6],
        'holidays': ['10-29']
      };
  }

  getConfig() {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', angular.toJson(this.defaultConfig))
    }
    return angular.fromJson(localStorage.getItem('config'));
  }

  setConfig(max, holiday = null) {
    const oldConfig = angular.fromJson(localStorage.getItem('config'));
    if (holiday) oldConfig.holidays.push(holiday);
    oldConfig.freePerMonth = max;
    localStorage.setItem('config', angular.toJson(oldConfig));
  }
}

export class ConfigService {
  constructor () {
    'ngInject';
    this.defaultConfig = {
      'freePerMonth': '7',
      'holidaysPerWeek': [5,6],
      'holidays': ['10-29'],
      'minRandomDate': '01-01-2015',
      'statStartDate' : '01-01-2016'
    };
  }

  getConfig() {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', angular.toJson(this.defaultConfig))
    }
    return angular.fromJson(localStorage.getItem('config'));
  }

  setConfig(max, holiday = null, randomLimit = null) {
    const oldConfig = angular.fromJson(localStorage.getItem('config'));
    if (holiday) oldConfig.holidays.push(holiday);
    if (randomLimit) oldConfig.minRandomDate = randomLimit;
    oldConfig.freePerMonth = max;
    localStorage.setItem('config', angular.toJson(oldConfig));
  }
}

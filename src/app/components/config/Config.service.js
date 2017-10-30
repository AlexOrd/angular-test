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

  findAll() {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', angular.toJson(this.defaultConfig))
    }
    return angular.fromJson(localStorage.getItem('config'));
  }

  addHoliday(value) {
    const config = angular.fromJson(localStorage.getItem('config'));
    config.holidays.push(value);
    localStorage.setItem('config', angular.toJson(config));
  }

  updateOne(name, value) {
    const config = angular.fromJson(localStorage.getItem('config'));
    config[name] = value;
    localStorage.setItem('config', angular.toJson(config));
  }
}

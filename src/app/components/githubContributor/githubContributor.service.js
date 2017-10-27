export class GithubContributorService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
    this.defaultUsers = [
      {
        'name': 'Ivan',
        'surname': 'Ivanov',
        'addDate': 'Wed Jan 01 2014',
        'delDate': 'Sun Oct 01 2017',
        'freeDays': {
          '2017': {
            '01' : ['03', '05']
          }
        }
      }
    ];
  }

  getContributors(limit=30) {
    return this.$http.get(this.apiHost + '/contributors?per_page=' + limit)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
  }

  getUsers() {
    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(this.defaultUsers))
    }
    return JSON.parse(localStorage.getItem('users'))
  }

}

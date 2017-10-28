export class StatisticsController {
  constructor (users, config, toastr) {
    'ngInject';

    this.config ={};
    this.usersList = [];
    this.classAnimation = '';
    this.toastr = toastr;
    this.usersModel = users;
    this.activate(users, config);

    this.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.series = ['Series A', 'Series B'];
    this.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  }

  activate(config) {
    //this.config = config.getConfig();
  }



  showToastr(type, info) {
    this.toastr[type](info);
    this.classAnimation = '';
  }
}

export class StatisticsController {
  constructor (users, config) {
    'ngInject';

    this.GLOB_START = '01-01-2016';
    this.config ={};
    this.usersList = [];
    this.classAnimation = '';
    this.usersService = users;
    this.globalLabels = [];
    this.globalSeries = ['Number of working days', 'Holidays'];
    this.userSeries = ['All', 'Working', 'Holidays'];
    this.globalData = [[],[]];
    this.options = {
      scales: {
        xAxes: [{
          gridLines: {
            offsetGridLines: true
          },
          stacked: true
        }]
      }
    };


    this.activate(config);
  }

  activate(config) {
    this.config = config.getConfig();
    this.GLOB_START = this.config.statStartDate;
    this.initGlobalStat();
    this.getUsers();
  }

  initGlobalStat() {
    const incDate = new Date(this.GLOB_START);
    const nowYear = new Date().getFullYear();
    do {
      const incMonth = incDate.getMonth();
      const incYear = incDate.getFullYear();
      this.globalLabels.push(`${incMonth + 1}.${incYear}`);
      this.globalData[0].push(0);
      this.globalData[1].push(0);
      incDate.setMonth(incDate.getMonth() + 1);

    } while (incDate.getFullYear() <= nowYear);
  }

  getUsers() {
    this.usersList = this.usersService.getUsers();

    angular.forEach(this.usersList, (user) => {
      user.labels = [];
      user.data =[[],[],[]] ;
      const incDate = new Date(user.addDate);
      const delDate = user.delDate ?  new Date(user.delDate) : new Date();
      do {
        const incMonth = incDate.getMonth();
        const incYear = incDate.getFullYear();
        const daysInMonth = new Date(incYear, incMonth, 0).getDate();
        const holidInMonth = user.freeDays.reduce(
          (prev, day) => (new Date(day).getMonth() === incMonth &&
            new Date(day).getFullYear() === incYear) ? ++prev : prev,
          0
        );
        const freeInMonth = this.config.holidays.reduce(
          (prev, day) => (day.split('-')[0] - 1) === incMonth ? ++prev : prev,
          0
        );

        const weekHolid = ((year, month) => {
          let day = 1;
          let count = 0;
          let date = new Date(year, month, day);
          while (date.getMonth() === month) {
            if ((this.config.holidaysPerWeek.find(d => d == date.getDay()) !== undefined)) count++;
            date = new Date(year, month, ++day);
          }
          return count;
        })(incYear, incMonth);

        // update global stat data
        const monthIndex = this.globalLabels.findIndex(date => {
          const splitDate = date.split('.');
          return splitDate[0] == (incMonth + 1) && splitDate[1] == incYear
        });

        if (monthIndex !== -1) {
          this.globalData[0][monthIndex] += (daysInMonth - weekHolid);
          this.globalData[1][monthIndex] += (holidInMonth + freeInMonth);
        }

        // update user data
        user.data[0].push(daysInMonth);
        user.data[1].push(daysInMonth - weekHolid);
        user.data[2].push(holidInMonth + freeInMonth);
        user.labels.push(`${incMonth + 1}.${incYear}`);
        incDate.setMonth(incDate.getMonth() + 1);
      } while (incDate.getFullYear() <= delDate.getFullYear());

    });
  }
}

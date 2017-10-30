export class MainController {
  constructor ($timeout, users, config, toastr) {
    'ngInject';

    this.MIN_DATE = '';
    this.config = {};
    this.usersList = [];
    this.classAnimation = '';
    this.toastr = toastr;
    this.usersModel = users;
    this.activate($timeout, users, config);
  }

  activate($timeout, users, config) {
    this.getUsers(users);
    this.config = config.findAll();
    this.MIN_DATE = this.config.minRandomDate;
    $timeout(() => {
      this.classAnimation = 'pulse';
    }, 2000);
  }

  saveFreeDays(usr) {
    const monthToUpdate = usr.dt.getMonth();
    const freeInMonth = usr.freeDays.reduce((value, date) => {
      return new Date(date).getMonth() == monthToUpdate ? ++value : value
    }, 0);

    if (freeInMonth >= this.config.freePerMonth) {
      this.showToastr('error', `${usr.name} has ${freeInMonth} from ${this.config.freePerMonth} free days`)
    } else {
      this.usersModel.setFreeDay(usr);
      this.showToastr('info', `Free day for ${usr.name} ${usr.surname} is </br> <b>${usr.dt.toDateString()}</b>`);
      this.getUsers(this.usersModel);
    }
  }

  saveIsFired(usr) {
      this.usersModel.setIsFired(usr);
      this.showToastr('warning', `${usr.name} ${usr.surname} is fired`);
      this.getUsers(this.usersModel);
  }

  getUsers(users) {
    this.usersList = users.findAll();

    const addFree = (user) => {
      return (data) => {
        let style = '';
        const createDate = (str) => new Date(str).setHours(0, 0, 0, 0);
        if (data.mode === 'day') {
          const dayToCheck = createDate(data.date);
          const checkFunc = (day) => {
            const holiday = createDate(`${day}-${data.date.getFullYear()}`);
            if (dayToCheck === holiday || this.config.holidaysPerWeek.find(d => d === data.date.getDay())) {
              style =  'partially';
            }
          };
          this.config.holidays.map(checkFunc);
          user.freeDays.map(checkFunc);
        }
        return style
      };
    };

    angular.forEach(this.usersList, (user) => {
      user.delDate = user.delDate ? user.delDate : 'until today';
      user.calendarOptions = {
        customClass: addFree(user),
        dateDisabled: addFree(user),
        minDate: new Date(this.MIN_DATE),
        showWeeks: false
      };
    });
  }

  addRandomUser() {
    const genSymbols = (len) => {
      let arr = new Uint8Array((len) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, (dec) => ('0' + dec.toString(16)).substr(-2)).join('')
    };
    const randDate = (str, end) => new Date(str.getTime() + Math.random() * (end.getTime() - str.getTime()));

    const isFired = Math.random() >= 0.5;
    const addDate = randDate(new Date(this.MIN_DATE), new Date());
    const delDate = randDate(addDate, new Date());


    const freeDays = new Array(Math.floor(Math.random() * 50)).fill('');
    const clearFreeDays = freeDays.map(_ => {
      let date;
      do {
        date = randDate(addDate, isFired ? delDate : new Date()).toDateString();
      } while (this.config.holidaysPerWeek.find(d => d == new Date(date).getDay()));
      return date
    });

    const newUser = {
      'name': genSymbols(6),
      'surname': genSymbols(8),
      'addDate': addDate.toDateString(),
      'delDate': isFired ? delDate.toDateString() : '',
      'freeDays': clearFreeDays,
      'isFired' : isFired
    };
    this.usersModel.addUser(newUser);
    this.showToastr('info', `New user: ${newUser.name} ${newUser.surname}`);
    this.getUsers(this.usersModel);

  }

  showToastr(type, info) {
    this.toastr[type](info);
  }
}

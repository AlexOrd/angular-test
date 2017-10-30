export class ConfigController {
  constructor (config, toastr) {
    'ngInject';
    this.configService = config;
    this.dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.monthList =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.config ={};
    this.toastr = toastr;
    this.daysInWeek = '';
    this.holidays = '';
    this.max = '';
    this.newMax = '';
    this.newHoliday = '';
    this.minRandomDate ='';
    this.minRandomDate = '';

    this.update();
  }

  update() {
    this.config = this.configService.findAll();
    this.daysInWeek = this.config.holidaysPerWeek.map(i => this.dayList[i]).join(', ');
    this.holidays = this.config.holidays.map(i => {
      const date = i.split('-');
      return `${date[1]} ${this.monthList[date[0]]}`
    }).join(', ');
    this.max = this.config.freePerMonth;
  }

  addNewHoliday() {
    if (this.newHoliday) {
      const value = `${this.newHoliday.getMonth() + 1}-${this.newHoliday.getDate()}`;
      this.configService.addHoliday(value);
      this.showToastr('info', 'Holidays updated');
      this.update();
    } else {
      this.showToastr('danger', 'Select date');
    }
  }

  addRandomDate() {
    if (this.minRandomDate) {
      const value = `${this.minRandomDate.getMonth() + 1}-${this.minRandomDate.getDate()}-${this.minRandomDate.getFullYear()}`;
      this.configService.updateOne('minRandomDate', value);
      this.showToastr('info', `Minimal random date is ${value}`);
      this.update();
    } else {
      this.showToastr('danger', 'Select date');
    }
  }

  changeMax() {
      this.configService.updateOne('freePerMonth', this.newMax);
      this.update();
      this.showToastr('info', `Max value is ${this.newMax}`);
  }

  showToastr(type, info) {
    this.toastr[type](info);
  }
}

export class UsersService {
  constructor () {
    'ngInject';
    this.defaultUsers = [
      {
        'id': '1',
        'name': 'Ivan',
        'surname': 'Ivanov',
        'addDate': 'Wed Jan 01 2014',
        'delDate': 'Sun Oct 01 2017',
        'freeDays': ['Sun Oct 29 2017'],
        'isFired': 'false'
      },
      {
        'id': '2',
        'name': 'Segey',
        'surname': 'Sergeev',
        'addDate': 'Wed Jan 01 2014',
        'delDate': 'Sun Oct 01 2017',
        'freeDays': ['Sun Oct 29 2017'],
        'isFired ': 'false'
      },
      {
        'id': '3',
        'name': 'Mikhail',
        'surname': 'Michailov',
        'addDate': 'Wed Jan 01 2014',
        'delDate': 'Sun Oct 01 2017',
        'freeDays': ['Sun Oct 29 2017', 'Wed Oct 25 2017'],
        'isFired ': 'false'
      },
      {
        'id': '4',
        'name': 'Gleb',
        'surname': 'Glebov',
        'addDate': 'Wed Jan 01 2014',
        'delDate': 'Sun Oct 01 2017',
        'freeDays': ['Sun Oct 29 2017', 'Wed Oct 25 2017'],
        'isFired ': 'false'
      }
    ];
  }

  getUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', angular.toJson(this.defaultUsers))
    }
    return angular.fromJson(localStorage.getItem('users')).map((user) => {
      user.addDate = new Date(user.addDate);
      user.delDate = user.delDate ? new Date(user.delDate) : '';
      user.freeDays = user.freeDays.map(day => new Date(day));
      return user
    });
  }

  setFreeDay(user) {
    const oldUsers = angular.fromJson(localStorage.getItem('users'));
    const userIndex = oldUsers.findIndex(a => a.id === user.id);
    oldUsers[userIndex].freeDays.push(user.dt.toDateString());
    localStorage.setItem('users', angular.toJson(oldUsers));
  }

  setIsFired(user) {
    const oldUsers = angular.fromJson(localStorage.getItem('users'));
    const userIndex = oldUsers.findIndex(a => a.id === user.id);
    oldUsers[userIndex].isFired = true;
    localStorage.setItem('users', angular.toJson(oldUsers));
  }

  addUser(user) {
    const oldUsers = angular.fromJson(localStorage.getItem('users'));
    const newId = parseInt(oldUsers[oldUsers.length - 1].id) + 1;
    user.id = newId;
    oldUsers.push(user);
    localStorage.setItem('users', angular.toJson(oldUsers));
  }
}

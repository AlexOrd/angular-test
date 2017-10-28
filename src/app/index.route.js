export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('statistics', {
      url: '/statistics',
      templateUrl: 'app/components/statistics/statistics.html',
      controller: 'StatisticsController',
      controllerAs: 'stat'
    })
    .state('configuration', {
      url: '/configuration',
      templateUrl: 'app/components/configuration/configuration.html',
      controller: 'ConfigController',
      controllerAs: 'conf'
    });

  $urlRouterProvider.otherwise('/');
}

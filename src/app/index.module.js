/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { StatisticsController } from '../app/components/statistics/statistics.controller';
import { ConfigController } from '../app/components/configuration/configuration.controller';
import { UsersService } from '../app/components/users/Users.service';
import { ConfigService } from '../app/components/config/Config.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';

angular.module('angular', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'chart.js'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('config', ConfigService)
  .service('users', UsersService)
  .controller('MainController', MainController)
  .controller('StatisticsController', StatisticsController)
  .controller('ConfigController', ConfigController)
  .directive('acmeNavbar', NavbarDirective)

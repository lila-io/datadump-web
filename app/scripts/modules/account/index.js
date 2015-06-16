'use strict';

angular
  .module('lila.web')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('account', {
          url: '/account',
          views: {
            body: {
              template: '' +
              '<md-content flex class="landing">' +
              ' <h1>Devices</h1>' +
              '</md-content>'
            }
          }
        });
    }
  ]);

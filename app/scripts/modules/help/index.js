'use strict';

angular
  .module('lila.web')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('help', {
          url: '/help',
          views: {
            body: {
              template: '' +
              '<md-content flex class="landing">' +
              ' <h1>Help</h1>' +
              '</md-content>'
            }
          }
        });
    }
  ]);

'use strict';

angular
  .module('lila.web')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('data', {
          url: '/data',
          views: {
            body: {
              template: '' +
              '<md-content flex class="landing">' +
              ' <h1>Data</h1>' +
              '</md-content>'
            }
          }
        });
    }
  ]);

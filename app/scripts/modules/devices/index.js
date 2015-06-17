'use strict';

angular
  .module('lila.web')
  .config(['$stateProvider',
    function ($stateProvider) {

      $stateProvider

        .state('devices', {
          url: '/devices',
          abstract: true,
          views: {
            body: {
              template: '<div ui-view></div>'
            }
          }
        })

        .state('devices.list', {
          url: '',
          templateUrl: 'scripts/modules/devices/templates/list.html',
          controllerAs: 'ctrl',
          controller: ['$state', function($state){
            this.showDevice = function(device){
              $state.go('^.show',{id:device.id});
            };
            this.devices = [
              {
                id: 1,
                title: 'Nexus 5',
                description: 'home device'
              },
              {
                id: 2,
                title: 'Arduino robot',
                description: 'dev device'
              },
              {
                id: 3,
                title: 'Temp sensor',
                description: 'Summerhouse outside temp sensor'
              },
              {
                id: 4,
                title: 'Weather station',
                description: 'Brandon Bay weather station'
              },
              {
                id: 5,
                title: 'Copter',
                description: 'Fancy quadcopter'
              },
            ];
          }]
        })

        .state('devices.show', {
          url: '/show/:id',
          templateUrl: 'scripts/modules/devices/templates/show.html',
          controllerAs: 'ctrl',
          controller: function(){
            this.device = {
              id: 1,
              title: 'Nexus 5',
              description: 'home device'
            };
          }
        })

        .state('devices.create', {
          url: '/create',
          templateUrl: 'scripts/modules/devices/templates/create.html',
          controllerAs: 'ctrl',
          controller: ['$state', function($state){
            this.save = function(){
              $state.go('^.show',{id:'xxx'});
            };
            this.device = {
              title: '',
              description: ''
            };
          }]
        })
        ;
    }
  ]);

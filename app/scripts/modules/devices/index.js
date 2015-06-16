'use strict';

angular
  .module('lila.web')
  .config(['$stateProvider',
    function ($stateProvider) {

      $stateProvider
        .state('devices', {
          url: '/devices',
          views: {
            body: {
              templateUrl: 'scripts/modules/devices/templates/list.html',
              controllerAs: 'ctrl',
              controller: function(){
                var imagePath = '';
                this.devices = [
                  {
                    imageUrl : imagePath,
                    title: 'Nexus 5',
                    description: 'home device'
                  },
                  {
                    imageUrl : imagePath,
                    title: 'Arduino robot',
                    description: 'dev device'
                  },
                  {
                    imageUrl : imagePath,
                    title: 'Temp sensor',
                    description: 'Summerhouse outside temp sensor'
                  },
                  {
                    imageUrl : imagePath,
                    title: 'Weather station',
                    description: 'Brandon Bay weather station'
                  },
                  {
                    imageUrl : imagePath,
                    title: 'Copter',
                    description: 'Fancy quadcopter'
                  },
                ];
              }
            }
          }
        });
    }
  ]);

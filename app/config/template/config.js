'use strict';

var app = angular.module('lila.web.config', []);

app.constant('configuration', {
  environment: '@@environment',
  app: {
    home: '@@app.baseUrl'
  },
  api: {
    baseUrl: '@@api.baseUrl'
  }
});

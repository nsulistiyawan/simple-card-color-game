(function() {
  'use strict';

  angular
    .module('cardcolorgame')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

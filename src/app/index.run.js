(function() {
  'use strict';

  angular
    .module('cardcolorgame')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('run app');
  }

})();

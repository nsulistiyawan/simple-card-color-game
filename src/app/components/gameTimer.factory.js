(function() {
  'use strict';
  angular
    .module('cardcolorgame')
    .factory('gameTimer', gameTimer);

    /** @ngInject */
    function gameTimer($interval) {

      var timeCount = 0;
      var interval = null;

      var timer = {
        startTimer : startTimer,
        stopTimer : stopTimer,
        duration : duration
      };

      return timer;

      function startTimer() {
        interval = $interval(function () {
          timeCount++;
        },1000);
      }

      function stopTimer() {
        $interval.cancel(interval);
        timeCount = 0;
      }

      function duration() {
        return timeCount;
      }


    }


})();

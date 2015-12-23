(function() {
  'use strict';

  angular
    .module('cardcolorgame')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, randomColor, $timeout, $interval, gameTimer) {
    var vm = this;

    vm.selectedCard = null;
    vm.introScreen = true;
    vm.disabledClick = false;
    vm.cardColors = [];
    vm.moveCount = 0;
    vm.rightCount = 0;
    vm.lastResult = null;
    vm.gameTimer = gameTimer;

    vm.initColors = initColors;
    function initColors() {
      vm.cardColors.length = 0;
      var attractiveColors = randomColor({
        // luminosity: 'light',
        count: 13
      });
      var finalColors = shuffleColor(attractiveColors.concat(attractiveColors.slice(0, 12)));
      for (var i = 0; i < finalColors.length; i++) {
        vm.cardColors.push({
          color: finalColors[i],
          flipped: false
        });
      }
    }
    initColors();
    function shuffleColor(o) {
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    vm.clickStart = clickStart;
    function clickStart() {
      gameTimer.startTimer();
      vm.introScreen = false;
    }

    vm.clickCard = clickCard;
    function clickCard(card) {
      //if no card selected
      if (vm.selectedCard === null & vm.disabledClick === false && card.flipped === false) {
        vm.selectedCard = card;
        card.flipped = true;
      //if there is card selected, different color with prev card && click not disabled
      } else if (vm.selectedCard !== null && vm.selectedCard.color !== card.color && vm.disabledClick === false & card.flipped === false) {
        vm.selectedCard.flipped = true;
        card.flipped = true;
        vm.moveCount++;

        vm.disabledClick = true;
        $timeout(function() {
          vm.selectedCard.flipped = false;
          card.flipped = false;
          vm.selectedCard = null;
          vm.disabledClick = false;
        }, 1000);
      //if there is card selected, same color with prev card && click not disabled
      } else if (vm.selectedCard !== null && vm.selectedCard.color === card.color & vm.disabledClick === false & card.flipped === false) {
        vm.selectedCard.flipped = true;
        card.flipped = true;
        vm.moveCount++;
        vm.rightCount++;

        if(vm.rightCount == 12){
          vm.lastResult = {
            'duration' : vm.gameTimer.duration(),
            'moveCount' : vm.moveCount
          };
          vm.introScreen = true;
          vm.moveCount = 0;
          vm.rightCount = 0;
          gameTimer.stopTimer();
          initColors();
        }

        vm.disabledClick = true;
        $timeout(function() {
          vm.selectedCard = null;
          vm.disabledClick = false;
        }, 1000);
      }
    }


  }
})();

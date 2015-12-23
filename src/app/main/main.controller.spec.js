(function() {
  'use strict';

  describe('main controllers', function(){
    var vm;


    beforeEach(module('cardcolorgame'));
    beforeEach(inject(function(_$controller_,_gameTimer_) {
      vm = _$controller_('MainController');
      vm.gameTimer = _gameTimer_;
    }));

    it('should have right init data', function() {
      expect(vm.introScreen).toBeTruthy();
      expect(vm.selectedCard).toBeNull();
      expect(vm.moveCount).toBe(0);
      expect(vm.rightCount).toBe(0);
      expect(vm.lastResult).toBeNull();
    });


    it('should have right card colors data',function () {
      expect(vm.cardColors).toBeDefined();
      vm.initColors();
      expect(angular.isArray(vm.cardColors)).toBeTruthy();
      expect(vm.cardColors.length).toBe(25);
    });

    it('should have gameTimer service & have 0 duration at start',function () {
      expect(vm.gameTimer).toBeDefined();
      expect(vm.gameTimer.duration()).toBe(0);
    });

    it('should show playscreen if right answer >= 12',function () {
      vm.initColors();
      vm.rightCount = 12;
      expect(vm.introScreen).toBeTruthy();
      expect(vm.gameTimer.duration()).toBe(0);

    });


  });
})();

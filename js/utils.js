'use strict';

(function () {
  window.utils = {
    CLASS_HIDDEN: 'hidden',
    ESCAPE_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();

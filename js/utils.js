'use strict';

(function () {
  var lastTimeout;

  window.utils = {
    CLASS_HIDDEN: 'hidden',
    ESCAPE_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    DEBOUNCE_INTERVAL: 300,
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, this.DEBOUNCE_INTERVAL);
    }
  };
})();

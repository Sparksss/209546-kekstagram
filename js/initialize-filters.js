'use strict';

(function () {

  window.initializeFilters = function (callback) {
    document.querySelector('.upload-effect-controls').addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.tagName.toLowerCase() === 'input') {
        callback(target.value);
      }
    });
  };
})();

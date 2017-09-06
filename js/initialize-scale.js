'use strict';

(function () {
  window.initializeScale = function (processedElement, callback) {
    document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
      callback(processedElement, -1);
    });
    document.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
      callback(processedElement, 1);
    });
  };
})();

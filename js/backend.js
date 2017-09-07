'use strict';

(function () {
  window.backend = {
    load: function (url, onLoad) {

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            if (typeof onLoad === 'function') {
              onLoad(xhr.response);
            }
            break;
        }
      });

      xhr.timeout = 2000;

      xhr.open('GET', url);

      xhr.send();
    },
    save: function () {

    }
  };

  window.backend.load('https://1510.dump.academy/kekstagram/data');

})();

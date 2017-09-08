'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var url = 'https://1510.dump.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            onError(xhr.status, xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 3000;

      xhr.open('GET', url);

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var url = 'https://1510.dump.academy/kekstagram';

      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          default:
            onError(xhr.status, xhr.statusText);
        }
      });

      xhr.open('POST', url);

      xhr.send(data);
    }
  };
})();

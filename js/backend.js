'use strict';

(function () {
  window.backend = {
    showError: function (status, text) {
      var statusError = '';
      switch (status) {
        case 400:
          statusError = 'Неверный запрос';
          break;
        case 401:
          statusError = 'Пользователь не авторизован';
          break;
        case 404:
          statusError = 'Ничего не найдено';
          break;

        default:
          statusError = 'Неизвестный статус: ' + status + ' ' + text;
      }
      var massage = document.querySelector('.upload-message');
      massage.querySelector('.upload-message-container').textContent = statusError;
      massage.classList.remove(window.utils.CLASS_HIDDEN);
    },
    load: function (onLoad, onError) {
      var url = 'https://1510.dump.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();

      xhr.timeout = 3000;

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

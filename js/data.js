'use strict';

(function () {
  window.collectionData = {
    getUserPhotos: function (number) {
      return {
        url: 'photos/' + number + '.jpg',
        likes: window.utils.getRandomNumber(15, 200),
        comments: this.getRandomNumberComments()
      };
    },
    getRandomNumberComments: function () {
      var temporaryComments = [];
      var commentsNumber = window.utils.getRandomNumber(0, 50);
      for (var i = 0; i < commentsNumber; i++) {
        temporaryComments[i] = window.utils.COMMENTS[window.utils.getRandomNumber(0, 5)];
      }
      return temporaryComments;
    }
  };
})();

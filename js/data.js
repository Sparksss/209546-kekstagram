'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
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
        temporaryComments[i] = COMMENTS[window.utils.getRandomNumber(0, 5)];
      }
      return temporaryComments;
    }
  };
})();

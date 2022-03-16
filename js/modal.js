import {similarThumbnails, thumbnailsList} from './thumbnails.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const thumbnails = thumbnailsList.querySelectorAll('.picture');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentElementTemplate = bigPicture.querySelector('.social__comment');

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    const {url, likes, comments, description} = similarThumbnails[index];

    const createSocialComment = (commentary) => {
      const commentElement = commentElementTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = `img/avatar-${commentary.avatar}.svg`;
      commentElement.querySelector('.social__picture').alt = commentary.name;
      commentElement.querySelector('.social__text').textContent = commentary.message;
      commentsList.append(commentElement);
    };

    document.body.classList.add('modal-open');
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    commentsList.innerHTML = '';
    comments.forEach((comment) => createSocialComment(comment));
    bigPicture.querySelector('.social__caption').textContent = description;

    bigPictureCloseButton.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
      }
    });
  });
});


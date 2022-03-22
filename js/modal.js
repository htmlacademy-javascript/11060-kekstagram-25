import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentElementTemplate = bigPicture.querySelector('.social__comment');

function closePopup () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const createSocialCommentInPopup = (commentary) => {
  const commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = `img/avatar-${commentary.avatar}.svg`;
  commentElement.querySelector('.social__picture').alt = commentary.name;
  commentElement.querySelector('.social__text').textContent = commentary.message;
  commentsList.append(commentElement);
};

const createPopup = (similarThumbnail, index) => {
  const {url, likes, comments, description} = similarThumbnail[index];

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  commentsList.innerHTML = '';
  comments.forEach((comment) => createSocialCommentInPopup(comment));
  bigPicture.querySelector('.social__caption').textContent = description;

  bigPictureCloseButton.addEventListener('click', closePopup);

  window.addEventListener('keydown', onPopupEscKeydown);
};

export {createPopup};

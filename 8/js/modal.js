import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentElementTemplate = bigPicture.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const COMMENTS_COUNT_PER_STEP = 5;

function closePopup () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onPopupEscKeydown);
  const commentsButton = bigPicture.querySelector('.social__comments-loader');

  if (commentsButton) {
    commentsButton.remove();
  }
}

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function createCommentButton () {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('social__comments-loader');
  button.classList.add('comments-loader');
  button.textContent = 'Загрузить еще';

  return button;
}

const setCommentsCount = (count, commentLength) => {
  commentsCount.innerHTML = `${count} из <span class='comments-count'>${commentLength}</span> комментариев`;
};

const createComment = (commentary) => {
  const commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = commentary.avatar;
  commentElement.querySelector('.social__picture').alt = commentary.name;
  commentElement.querySelector('.social__text').textContent = commentary.message;
  commentsList.append(commentElement);
};

const createAllComments = (commentaries) => {
  let renderedCommentsCount = COMMENTS_COUNT_PER_STEP;
  commentsLoaderButton.remove();
  const moreCommentsButton = createCommentButton();

  if (commentaries.length <= COMMENTS_COUNT_PER_STEP) {
    commentaries.forEach((commentary) => createComment(commentary));
    setCommentsCount(commentaries.length, commentaries.length);

  } else {
    commentsList.insertAdjacentElement('afterend', moreCommentsButton);
    setCommentsCount(renderedCommentsCount, commentaries.length);

    for (let i = 0; i < COMMENTS_COUNT_PER_STEP; i++) {
      createComment(commentaries[i]);
    }

    const createEstimatedComments = () => {
      const slicedComments = commentaries.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_COUNT_PER_STEP);
      slicedComments.forEach((commentary) => createComment(commentary));

      renderedCommentsCount += COMMENTS_COUNT_PER_STEP;
      setCommentsCount(renderedCommentsCount, commentaries.length);

      if (renderedCommentsCount >= commentaries.length) {
        renderedCommentsCount = COMMENTS_COUNT_PER_STEP;
        moreCommentsButton.remove();
        setCommentsCount(commentaries.length, commentaries.length);
      }
    };

    moreCommentsButton.addEventListener('click', createEstimatedComments);
  }
};

const createPopup = (thumbnail) => {
  const {url, likes, comments, description} = thumbnail;

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  createAllComments(comments);

  bigPictureCloseButton.addEventListener('click', closePopup);

  window.addEventListener('keydown', onPopupEscKeydown);
};

export {createPopup};

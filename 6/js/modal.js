import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const commentElementTemplate = bigPicture.querySelector('.social__comment');
const COMMENTS_COUNT_PER_STEP = 5;

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

const createComment = (commentary) => {
  const commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = `img/avatar-${commentary.avatar}.svg`;
  commentElement.querySelector('.social__picture').alt = commentary.name;
  commentElement.querySelector('.social__text').textContent = commentary.message;
  commentsList.append(commentElement);
};

const createAllComments = (commentaries) => {
  let renderedCommentsCount = 5;

  if (commentaries.length <= COMMENTS_COUNT_PER_STEP) {
    commentaries.forEach((commentary) => createComment(commentary));
    commentsLoaderButton.classList.add('hidden');
    socialCommentsCount.innerHTML = `${commentaries.length} из <span class='comments-count'>${commentaries.length}</span> комментариев`;

  } else {
    commentsLoaderButton.classList.remove('hidden');
    for (let i = 0; i < COMMENTS_COUNT_PER_STEP; i++) {
      createComment(commentaries[i]);
      socialCommentsCount.innerHTML = `${renderedCommentsCount} из <span class='comments-count'>${commentaries.length}</span> комментариев`;
    }

    commentsLoaderButton.addEventListener('click', () => {
      commentaries
        .slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_COUNT_PER_STEP)
        .forEach((commentary) => createComment(commentary));

      renderedCommentsCount += COMMENTS_COUNT_PER_STEP;
      socialCommentsCount.innerHTML = `${renderedCommentsCount} из <span class='comments-count'>${commentaries.length}</span> комментариев`;
      if (renderedCommentsCount > commentaries.length) {
        renderedCommentsCount = COMMENTS_COUNT_PER_STEP;
        commentsLoaderButton.classList.add('hidden');
        socialCommentsCount.innerHTML = `${commentaries.length} из <span class='comments-count'>${commentaries.length}</span> комментариев`;
      }
    });
  }
};

const createPopup = (similarThumbnail, index) => {
  const {url, likes, comments, description} = similarThumbnail[index];

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  //bigPicture.querySelector('.comments-count').textContent = comments.length;
  //commentsList.innerHTML = '';
  [...commentsList.children].forEach((node) => node.remove());
  createAllComments(comments);
  //comments.forEach((comment) => createSocialCommentInPopup(comment));
  bigPicture.querySelector('.social__caption').textContent = description;

  bigPictureCloseButton.addEventListener('click', closePopup);

  window.addEventListener('keydown', onPopupEscKeydown);
};

export {createPopup};

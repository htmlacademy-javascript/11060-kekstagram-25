const REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENTARY_LENGTH = 140;

function getHashtagErrorMessage (value) {
  const hashtagArray = value.split(' ');
  const uniqueHashtags = new Set(hashtagArray);

  if (hashtagArray.length > MAX_HASHTAGS) {
    return 'Не более пяти хэштегов';
  }

  for (const hashtag of hashtagArray) {
    if (!hashtag.startsWith('#')) {
      return 'Хэштег должен начинаться с символа #';
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
      return 'Не менее 2 и не более 20 символов в хэштеге';
    }

    if (!REGEXP.test(hashtag)) {
      return 'Только буквы и цифры после символа #';
    }
  }

  if (uniqueHashtags.size !== hashtagArray.length) {
    return 'Не должно быть одинаковых хэштегов';
  }
}

function validateHashtag (value) {
  const hashtagArray = value.split(' ');
  const uniqueHashtags = new Set(hashtagArray);

  if (value === '') {
    return true;
  }

  if (hashtagArray.length > MAX_HASHTAGS) {
    return false;
  }

  for (const hashtag of hashtagArray) {
    if (!hashtag.startsWith('#')) {
      return false;
    }

    if (!hashtag.length >= MIN_HASHTAG_LENGTH && !hashtag.length < MAX_HASHTAG_LENGTH) {
      return false;
    }

    if (!REGEXP.test(hashtag)) {
      return false;
    }
  }

  if (uniqueHashtags.size !== hashtagArray.length) {
    return false;
  }

  return true;
}

function validateCommentary (value) {
  return value.length <= MAX_COMMENTARY_LENGTH;
}

export {getHashtagErrorMessage, validateHashtag, validateCommentary};

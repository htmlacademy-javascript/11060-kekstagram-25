const REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENTARY_LENGTH = 140;

const getHashtagErrorMessage = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length > MAX_HASHTAGS) {
    return 'Не более пяти хэштегов';
  }

  for (const hashtag of hashtags) {
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

  if (uniqueHashtags.size !== hashtags.length) {
    return 'Не должно быть одинаковых хэштегов';
  }
};

const validateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);

  if (value === '') {
    return true;
  }

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (const hashtag of hashtags) {
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

  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

const validateCommentary = (value) => value.length <= MAX_COMMENTARY_LENGTH;

export {getHashtagErrorMessage, validateHashtag, validateCommentary};

import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFileForm = document.querySelector('#upload-file');
const imageEditorForm = document.querySelector('.img-upload__overlay');
const closeImageEditorButton = document.querySelector('#upload-cancel');
const hashtagInputTemplate = document.querySelector('.text__hashtags');
const commentaryInputTemplate = document.querySelector('.text__description');

const inputsField = document.querySelector('.img-upload__text');
const hashtagInput = hashtagInputTemplate.cloneNode(true);
const commentaryInput = commentaryInputTemplate.cloneNode(true);

inputsField.innerHTML = '';

//Создал обертку для полей ввода хэштега и комментариев, чтобы pristine отображал результат проверки под соотв. полями
const divHashtagInputContainer = document.createElement('div');
const divCommentaryInputContainer = document.createElement('div');
divHashtagInputContainer.classList.add('text__input-container');
divCommentaryInputContainer.classList.add('text__input-container');
inputsField.append(divHashtagInputContainer);
inputsField.append(divCommentaryInputContainer);
divHashtagInputContainer.append(hashtagInput);
divCommentaryInputContainer.append(commentaryInput);

form.setAttribute('action', 'https://25.javascript.pages.academy/kekstagram');
hashtagInput.setAttribute('type', 'text');

uploadFileForm.addEventListener('change', openImageEditor);

function closeImageEditor () {
  imageEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileForm.value = '';
}

const onEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditor();
  }
};

function openImageEditor () {
  imageEditorForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeImageEditorButton.addEventListener('click', closeImageEditor);

  window.addEventListener('keydown', onEditorEscKeydown);

  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  commentaryInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
}

const pristine = new Pristine(form, {
  classTo: 'text__input-container',
  errorClass: 'text__input-container--invalid',
  successClass: 'text__input-container--valid',
  errorTextParent: 'text__input-container',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

function getHashtagErrorMessage () {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtagArray = hashtagInput.value.split(' ');
  const hashtagArrayCompare = [...new Set(hashtagArray)]; // создал копию массива методом Set, который удаляет повторяющиеся хэштеги и сравнид, отличаются ли массивы

  if (hashtagInput.value.length < 2 || hashtagInput.value.length > 20) {
    return 'Не менее 2 и не более 20 символов в хэштеге';
  }

  for (const hashtag of hashtagArray) {
    if (!regexp.test(hashtag)) {
      return 'Только буквы и цифры после символа #';
    }

    if (!hashtag.startsWith('#')) {
      return 'Хэштег должен начинаться с символа #';
    }
  }

  for (let i = 0; i < hashtagArray.length; i++) {
    if (hashtagArrayCompare[i] !== hashtagArray[i]) {
      return 'Не должно быть одинаковых хэштегов';
    }
  }
}

function validateHashtag (value) {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtagArray = value.split(' ');
  const hashtagArrayCompare = [...new Set(hashtagArray)];

  if (value === '') {
    return true;
  }

  if (hashtagArray.length > 5) {
    return false;
  }

  for (const hashtag of hashtagArray) {
    if (!hashtag.length >= 2 && !hashtag.length < 20) {
      return false;
    }

    if (!regexp.test(hashtag)) {
      return false;
    }

    if (!hashtag.startsWith('#')) {
      return false;
    }
  }

  for (let i = 0; i < hashtagArray.length; i++) {
    if (hashtagArrayCompare[i] !== hashtagArray[i]) {
      return false;
    }
  }

  return true;
}

function validateCommentary (value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentaryInput,
  validateCommentary,
  'Не более 140 символов'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});



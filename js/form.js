import {isEscapeKey} from './util.js';
import {getHashtagErrorMessage, validateHashtag, validateCommentary} from './validate.js';
import {sendData} from './api.js';
import {editorReset} from './editor.js';

const COMMENTARY_ERROR_MESSAGE = 'Не более 140 символов';
const form = document.querySelector('.img-upload__form');
const uploadFileForm = document.querySelector('#upload-file');
const imageEditorForm = document.querySelector('.img-upload__overlay');
const closeImageEditorButton = document.querySelector('#upload-cancel');
const hashtagInputTemplate = document.querySelector('.text__hashtags');
const commentaryInputTemplate = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const inputsField = document.querySelector('.img-upload__text');
const hashtagInput = hashtagInputTemplate.cloneNode(true);
const commentaryInput = commentaryInputTemplate.cloneNode(true);

inputsField.innerHTML = '';

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

const closeImageEditor = () => {
  imageEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileForm.value = '';
  editorReset();
};

const openImageEditor = () => {
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
};

function onEditorEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditor();
  }
}

uploadFileForm.addEventListener('change', openImageEditor);

const pristine = new Pristine(form, {
  classTo: 'text__input-container',
  errorClass: 'text__input-container--invalid',
  successClass: 'text__input-container--valid',
  errorTextParent: 'text__input-container',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(commentaryInput, validateCommentary, COMMENTARY_ERROR_MESSAGE);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onError = () => {
  const errorTemplate = document.querySelector('#error').content;
  const error = errorTemplate.cloneNode(true);
  document.body.append(error);
  closeImageEditor();
  const onErrorBlock = document.querySelector('.error');
  const onErrorButton = onErrorBlock.querySelector('.error__button');

  onErrorButton.addEventListener('click', () => {
    onErrorBlock.remove();
  }, {once: true});

  const onErrorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onErrorBlock.remove();
    }
  };

  window.addEventListener('keydown', onErrorEscKeydown);

  window.addEventListener('click', (evt) => {
    if (evt.target === onErrorBlock) {
      onErrorBlock.remove();
    }
  }, {once: true});
};

const onSuccess = () => {
  const successTemplate = document.querySelector('#success').content;
  const success = successTemplate.cloneNode(true);
  document.body.append(success);
  const onSuccessBlock = document.querySelector('.success');
  const onSuccessButton = onSuccessBlock.querySelector('.success__button');
  closeImageEditor();
  editorReset();

  onSuccessButton.addEventListener('click', () => {
    onSuccessBlock.remove();
  }, {once: true});

  const onSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onSuccessBlock.remove();
    }
  };

  window.addEventListener('keydown', onSuccessEscKeydown);

  window.addEventListener('click', (evt) => {
    if (evt.target === onSuccessBlock) {
      onSuccessBlock.remove();
    }
  }, {once: true});
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
      },
      () => {
        onError();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});


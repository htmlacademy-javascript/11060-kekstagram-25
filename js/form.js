import {isEscapeKey} from './util.js';
import {getHashtagErrorMessage, validateHashtag, validateCommentary} from './validate.js';

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



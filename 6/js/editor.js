//const imageEditorForm = document.querySelector('.img-upload__overlay');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');

//imageEditorForm.classList.remove('hidden'); // не забыть удалить

scaleValue.removeAttribute('readonly');

let defaultScaleValue = 100;
scaleValue.setAttribute('value', `${defaultScaleValue}%`);

let defaultScale = 1;
image.style.transform = `scale(${defaultScale})`;

scaleDownButton.addEventListener('click', () => {
  defaultScaleValue -= 25;
  defaultScale -= 0.25;
  if (defaultScaleValue <= 25 && defaultScale <= 0.25) {
    defaultScaleValue = 25;
    defaultScale = 0.25;
  }
  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
  image.style.transform = `scale(${defaultScale})`;
});

scaleUpButton.addEventListener('click', () => {
  defaultScaleValue += 25;
  defaultScale += 0.25;
  if (defaultScaleValue >= 100 && defaultScale >= 1) {
    defaultScaleValue = 100;
    defaultScale = 1;
  }
  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
  image.style.transform = `scale(${defaultScale})`;
});

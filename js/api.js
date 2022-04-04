const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getData, sendData};

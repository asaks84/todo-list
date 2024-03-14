import './style.scss';
import flatpickr from 'flatpickr';
import IMask from 'imask';

const addField = document.querySelector('#addItem');
const dueDate = document.querySelector('#dueDate');

function openPlusBtn() {
  const plusBtn = addField.nextElementSibling;
  if (addField.value !== '') {
    plusBtn.classList.remove('d-none');
  }
  if (addField.value === '' && !plusBtn.classList.contains('d-none')) {
    plusBtn.classList.add('d-none');
  }
}

const maskDate = {
  mask: [
    {
      mask: 'd/`m/`Y',
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1000,
          to: 9999,
        },
      },
    },
  ],
};

IMask(dueDate, maskDate);

addField.addEventListener('keydown', openPlusBtn);
addField.addEventListener('keyup', openPlusBtn);
dueDate.setAttribute('autocomplete', 'off');

flatpickr(dueDate, { dateFormat: 'd/m/Y', allowInput: true });

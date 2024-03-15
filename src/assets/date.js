// import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import IMask from 'imask';

const dueDate = document.querySelector('#dueDate');
const splitToCode = (date) => date.split('/').reverse().join('/').replaceAll('/', ', ');
export const toInput = (data) => format(new Date(splitToCode(data)), 'dd/LL/yyyy');
// const getData = (arr) => arr.forEach(element => {

// });

export const maskDate = {
  prepare: (value) => value, // onChange event
  commit: (value) => (dueDate.value = value),
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

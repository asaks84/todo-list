// const { ptBR } = require('date-fns/locale');
const { format } = require('date-fns');

const splitToCode = (date) => date.split('/').reverse().join('/').replaceAll('/', ', ');
const toInput = (data) => format(new Date(splitToCode(data)), 'dd/LL/yyyy');
// const getData = (arr) => arr.forEach(element => {

// });

module.exports = toInput();

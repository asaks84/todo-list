export const modalWrap = document.querySelector('.modal-wrap');
export const modal = document.querySelector('#modal');

const binder = () => document.querySelector('#modal > .binder');

// fill modal
export function fillModal(content) {
  modal.appendChild(content);
}

// side functions
export const toCloseModal = (e) => e.target.classList.contains('close');

function setModalWidth() {
  modal.style.width = binder().offsetWidth;
}

// open modal
export function showModal() {
  setModalWidth();
  modalWrap.classList.add('visible');
}

// clear modal
export function clearModal() {
  while (modal.firstChild) {
    modal.removeChild(modal.lastChild);
  }
}

// close modal
export function closeModal(e) {
  if (toCloseModal(e)) {
    modalWrap.classList.remove('visible');
    clearModal();
  }
}

// modalWrap.addEventListener('click', closeModal);

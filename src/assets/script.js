const listItems = document.querySelectorAll('#listItems > li');
const isChecked = (e) => e.checked === true;

function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;

  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');
}

listItems.forEach((e) => e.addEventListener('change', editLine));

const itemsContainer = document.querySelectorAll(
  '.items-container'
) as NodeListOf<HTMLDivElement>;

let actualContainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUl: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

const addContainerListener = (currentContainer: HTMLDivElement) => {
  const currentContainerDeletionBtn = currentContainer.querySelector(
    '.delete-container-btn'
  ) as HTMLButtonElement;

  const currentAddItemBtn = currentContainer.querySelector(
    '.add-item-btn'
  ) as HTMLButtonElement;

  const currentCloseFormBtn = currentContainer.querySelector(
    '.close-form-btn'
  ) as HTMLButtonElement;

  const currentForm = currentContainer.querySelector('form') as HTMLFormElement;

  deleteBtnListener(currentContainerDeletionBtn);
  addItemBtnListener(currentAddItemBtn);
  closeFormBtnListener(currentCloseFormBtn);
  addFormSubmitListener(currentForm);
};

// LISTENER
const deleteBtnListener = (btn: HTMLButtonElement) => {
  btn.addEventListener('click', deleteItemHandler);
};

const addItemBtnListener = (btn: HTMLButtonElement) => {
  btn.addEventListener('click', addItemHandler);
};
const closeFormBtnListener = (btn: HTMLButtonElement) => {
  btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
};

const addFormSubmitListener = (form: HTMLFormElement) => {
  form.addEventListener('submit', createNewItem);
};

// HANDLER
const deleteItemHandler = (e: MouseEvent) => {
  const btn = e.target as HTMLButtonElement;

  const btnArray = [
    ...document.querySelectorAll('.delete-container-btn'),
  ] as HTMLButtonElement[];

  const containers = [
    ...document.querySelectorAll('.items-container'),
  ] as HTMLDivElement[];

  containers[btnArray.indexOf(btn)].remove();
};

const addItemHandler = (e: MouseEvent) => {
  const btn = e.target as HTMLButtonElement;
  actualContainer && toggleForm(actualBtn, actualForm, false);
  setContainerItem(btn);
  toggleForm(actualBtn, actualForm, true);
};

const toggleForm = (
  btn: HTMLButtonElement,
  form: HTMLFormElement,
  action: boolean
) => {
  if (!action) {
    form.style.display = 'none';
    btn.style.display = 'block';
  } else {
    form.style.display = 'block';
    btn.style.display = 'none';
  }
};

const setContainerItem = (btn: HTMLButtonElement) => {
  actualBtn = btn;
  actualContainer = btn.parentElement as HTMLDivElement;
  actualUl = actualContainer.querySelector('ul') as HTMLUListElement;
  actualForm = actualContainer.querySelector('form') as HTMLFormElement;
  actualTextInput = actualContainer.querySelector('input') as HTMLInputElement;
  actualValidation = actualContainer.querySelector(
    '.validation-msg'
  ) as HTMLSpanElement;
};

itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListener(container);
});

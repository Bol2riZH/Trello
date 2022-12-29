// DECLARATION
const itemsContainer = document.querySelectorAll(
  '.items-container'
) as NodeListOf<HTMLDivElement>;

let actualContainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUl: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

const addContainerBtn = document.querySelector(
  '.add-container-btn'
) as HTMLButtonElement;
const addContainerForm = document.querySelector(
  '.add-new-container form'
) as HTMLFormElement;
const addContainerFormInput = document.querySelector(
  '.add-new-container input'
) as HTMLInputElement;
const validationNewContainer = document.querySelector(
  '.add-new-container .validation-msg'
) as HTMLSpanElement;
const addContainerCloseBtn = document.querySelector(
  '.close-add-list'
) as HTMLButtonElement;
const addNewContainer = document.querySelector(
  '.add-new-container'
) as HTMLDivElement;
const containersList = document.querySelector(
  '.main-content'
) as HTMLDivElement;

// ACTION
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

const showItemContainer = (btn: HTMLButtonElement) => {
  actualBtn = btn;
  actualContainer = btn.parentElement as HTMLDivElement;
  actualUl = actualContainer.querySelector('ul') as HTMLUListElement;
  actualForm = actualContainer.querySelector('form') as HTMLFormElement;
  actualTextInput = actualContainer.querySelector('input') as HTMLInputElement;
  actualValidation = actualContainer.querySelector(
    '.validation-msg'
  ) as HTMLSpanElement;
};

const createNewItem = (e: SubmitEvent) => {
  e.preventDefault();
  // validation
  if (actualTextInput.value.length === 0) {
    return (actualValidation.textContent = 'Must be at least 1 character long');
  } else {
    actualValidation.textContent = '';
  }
  // create item
  const itemContent = actualTextInput.value;
  const li = `
    <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button>X</button>
    </li>`;
  actualUl.insertAdjacentHTML('beforeend', li);

  const item = actualUl.lastElementChild as HTMLLIElement;
  const liBtn = item.querySelector('button') as HTMLButtonElement;
  deleteTaskFromItemHandler(liBtn);
};

const createNewContainer = (e: SubmitEvent) => {
  e.preventDefault();
  if (addContainerFormInput.value.length === 0) {
    return (validationNewContainer.textContent =
      'Must be at least 1 character long');
  } else {
    validationNewContainer.textContent = '';
  }

  const itemsContainer = document.querySelector(
    '.items-container'
  ) as HTMLDivElement;
  const newContainer = itemsContainer.cloneNode() as HTMLDivElement;
  newContainer.innerHTML = `
        <div class="top-container">
          <h2>${addContainerFormInput.value}</h2>
          <button class="delete-container-btn">X</button>
        </div>
        <ul></ul>
        <button class="add-item-btn">Add an item</button>
        <form autocomplete="off">
          <div class="top-form-container">
            <label for="item">Add a new item</label>
            <button type="button" class="close-form-btn">X</button>
          </div>
          <input type="text" id="item" />
          <span class="validation-msg"></span>
          <button type="submit">Submit</button>
        </form>`;
  containersList.insertBefore(newContainer, addNewContainer);
  addContainerFormInput.value = '';
  addContainerListener(newContainer);
};

// LISTENER
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

addContainerBtn.addEventListener('click', () => {
  toggleForm(addContainerBtn, addContainerForm, true);
});

addContainerCloseBtn.addEventListener('click', () => {
  toggleForm(addContainerBtn, addContainerForm, false);
});

addContainerForm.addEventListener('submit', createNewContainer);

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

const deleteTaskFromItemHandler = (btn: HTMLButtonElement) => {
  btn.addEventListener('click', () => {
    const elToRemove = btn.parentElement as HTMLLIElement;
    elToRemove.remove();
  });
};

const addItemHandler = (e: MouseEvent) => {
  const btn = e.target as HTMLButtonElement;
  actualContainer && toggleForm(actualBtn, actualForm, false);
  showItemContainer(btn);
  toggleForm(actualBtn, actualForm, true);
};

itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListener(container);
});

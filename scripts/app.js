"use strict";
// DECLARATION
const itemsContainer = document.querySelectorAll('.items-container');
let actualContainer, actualBtn, actualUl, actualForm, actualTextInput, actualValidation;
const addContainerBtn = document.querySelector('.add-container-btn');
const addContainerForm = document.querySelector('.add-new-container form');
const addContainerFormInput = document.querySelector('.add-new-container input');
const validationNewContainer = document.querySelector('.add-new-container .validation-msg');
const addContainerCloseBtn = document.querySelector('.close-add-list');
const addNewContainer = document.querySelector('.add-new-container');
const containersList = document.querySelector('.main-content');
// ACTION
const toggleForm = (btn, form, action) => {
    if (!action) {
        form.style.display = 'none';
        btn.style.display = 'block';
    }
    else {
        form.style.display = 'block';
        btn.style.display = 'none';
    }
};
const showItemContainer = (btn) => {
    actualBtn = btn;
    actualContainer = btn.parentElement;
    actualUl = actualContainer.querySelector('ul');
    actualForm = actualContainer.querySelector('form');
    actualTextInput = actualContainer.querySelector('input');
    actualValidation = actualContainer.querySelector('.validation-msg');
};
const createNewItem = (e) => {
    e.preventDefault();
    // validation
    if (actualTextInput.value.length === 0) {
        return (actualValidation.textContent = 'Must be at least 1 character long');
    }
    else {
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
    const item = actualUl.lastElementChild;
    const liBtn = item.querySelector('button');
    deleteTaskFromItemHandler(liBtn);
};
const createNewContainer = (e) => {
    e.preventDefault();
    if (addContainerFormInput.value.length === 0) {
        return (validationNewContainer.textContent =
            'Must be at least 1 character long');
    }
    else {
        validationNewContainer.textContent = '';
    }
    const itemsContainer = document.querySelector('.items-container');
    const newContainer = itemsContainer.cloneNode();
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
const addContainerListener = (currentContainer) => {
    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn');
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn');
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn');
    const currentForm = currentContainer.querySelector('form');
    deleteBtnListener(currentContainerDeletionBtn);
    addItemBtnListener(currentAddItemBtn);
    closeFormBtnListener(currentCloseFormBtn);
    addFormSubmitListener(currentForm);
};
const deleteBtnListener = (btn) => {
    btn.addEventListener('click', deleteItemHandler);
};
const addItemBtnListener = (btn) => {
    btn.addEventListener('click', addItemHandler);
};
const closeFormBtnListener = (btn) => {
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
};
const addFormSubmitListener = (form) => {
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
const deleteItemHandler = (e) => {
    const btn = e.target;
    const btnArray = [
        ...document.querySelectorAll('.delete-container-btn'),
    ];
    const containers = [
        ...document.querySelectorAll('.items-container'),
    ];
    containers[btnArray.indexOf(btn)].remove();
};
const deleteTaskFromItemHandler = (btn) => {
    btn.addEventListener('click', () => {
        const elToRemove = btn.parentElement;
        elToRemove.remove();
    });
};
const addItemHandler = (e) => {
    const btn = e.target;
    actualContainer && toggleForm(actualBtn, actualForm, false);
    showItemContainer(btn);
    toggleForm(actualBtn, actualForm, true);
};
itemsContainer.forEach((container) => {
    addContainerListener(container);
});

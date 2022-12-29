"use strict";
const itemsContainer = document.querySelectorAll('.items-container');
let actualContainer, actualBtn, actualUl, actualForm, actualTextInput, actualValidation;
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
// LISTENER
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
const deleteTaskHandler = (btn) => {
    btn.addEventListener('click', () => {
        const elToRemove = btn.parentElement;
        elToRemove.remove();
    });
};
const addItemHandler = (e) => {
    const btn = e.target;
    actualContainer && toggleForm(actualBtn, actualForm, false);
    setContainerItem(btn);
    toggleForm(actualBtn, actualForm, true);
};
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
const setContainerItem = (btn) => {
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
        return (actualValidation.textContent = 'Must ba at least 1 character long');
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
    deleteTaskHandler(liBtn);
};
itemsContainer.forEach((container) => {
    addContainerListener(container);
});

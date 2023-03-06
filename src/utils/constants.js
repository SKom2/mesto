export const profileEditButton = document.querySelector('#button_edit');
export const photoAddButton = document.querySelector('#button_add');
export const cardsAddForm = document.querySelector('#cardsAddForm');
export const profileEditForm =document.querySelector('#profileEditForm');
export const validationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

export const apiConfig = {
    url: 'https://nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '0823f3d8-cee4-4f0b-9f88-c1dcbe025215',
        'Content-Type': 'application/json'
    }
}
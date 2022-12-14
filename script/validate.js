const showError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, config);
    } else {
        hideError(formElement, inputElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};


const setButtonState = (popup, config) => {
    const formElement = popup.querySelector(config.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement  = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
}

const setInputValidity = (popup, config) => {
    const formElement = popup.querySelector(config.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement, config);
    });
};
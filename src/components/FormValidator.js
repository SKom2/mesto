export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showError(inputElement){
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement){
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(){
        if (this._hasInvalidInput()){
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners(){
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    setButtonState() {
        this._toggleButtonState()
    }

    setInputValidity() {
        this._inputList.forEach((inputElement) => {
            this._checkInputValidity(inputElement);
        });
    };

    setState() {
        this._toggleButtonState()
        this.setInputValidity();
    }

    enableValidation(){
        this._setEventListeners();
    };
}
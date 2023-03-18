import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {callBack}) {
        super(popupSelector);
        this._callBack = callBack;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._button = this._popup.querySelector('.form__button');
        this.setEventListeners();
    }

    _getInputValues(){
        const formData = {};
        this._inputList.forEach((input) => {
            formData[input.name] = input.value;
        })

        return formData;
    }

    setInputValues(inputValues) {
        this._inputList.forEach((input) => {
            input.value = inputValues[input.name];
        });
    }

    changeButtonState(isLoad, currentState, loadingState) {
        if (isLoad) {
            this._button.textContent = loadingState
        } else {
            this._button.textContent = currentState;
        }
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callBack(this._getInputValues());
        });
    }
}
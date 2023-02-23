import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {callBack}) {
        super(popupSelector);
        this._callBack = callBack;
        this._formElement = this._popupSelector.querySelector('.form');
        this._inputList = this._popupSelector.querySelectorAll('.form__input');
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

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callBack(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        if (this._formElement) {
            if (this._formElement.id === 'cardsAddForm') {
                this._formElement.reset();
            }
        }
    }

}
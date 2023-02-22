import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({popupSelector, callBack}) {
        super(popupSelector);
        this._callBack = callBack;
        this._formElement = this._popupSelector.querySelector('.form');
        this.setEventListeners();
    }

    _getInputValues(){
        this._formData = {};
        this._inputList = this._popupSelector.querySelectorAll('.form__input');
        this._inputList.forEach((input) => {
            this._formData[input.name] = input.value;
        })

        return this._formData;
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
        this._formElement.reset();
    }

}
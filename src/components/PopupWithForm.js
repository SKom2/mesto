import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {callBack, submit}) {
        super(popupSelector);
        this._callBack = callBack;
        this._submit = submit;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__input');
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

    open(cardId, element) {
        super.open();
        this._cardId = cardId;
        this._element = element;
    }

    _close() {
        super._close();
        if (this._formElement) {
            if (this._formElement.id === 'cardsAddForm') {
                this._formElement.reset();
            }
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._submit) {
                this._submit(this._cardId, this._element);
            }
            if (this._callBack) {
                this._callBack(this._getInputValues());
            }
            this._close();
        });
    }
}
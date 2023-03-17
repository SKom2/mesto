import {Popup} from "./Popup";

export class PopupWithConfirmation extends Popup{
    constructor(popupSelector, {callBack}) {
        super(popupSelector);
        this._callBack = callBack;
        this._formElement = this._popup.querySelector('.form');
        this._button = this._popup.querySelector('.form__button');
        this.setEventListeners();
    }
    open(cardId, element) {
        super.open();
        this._cardId = cardId;
        this._element = element;
    }

    changeButtonState(isLoad, currentState, loadingState) {
        if (isLoad) {
            this._button.textContent = loadingState
        } else {
            this._button.textContent = currentState;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._callBack(this._cardId, this._element);
        })
    }
}
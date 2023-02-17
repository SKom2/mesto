import {popupCloseButtons} from "../utils/constants";

export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape'){
            close();
        }
    }

    setEventListeners() {
        popupCloseButtons.forEach((closeButton) => {
            this._closeButton = closeButton.closest(this._popupSelector);
            closeButton.addEventListener('click', () => close());
        });
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if(evt.target === this._popupSelector){
                close();
            }
        })

    }
}
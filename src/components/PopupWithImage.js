import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__image');
        this._title = this._popupSelector.querySelector('.popup__title');
    }

    open(data) {
        super.open();
        this._image.src = data.link;
        this._image.alt = data.name;
        this._title.textContent = data.name;
    }
}
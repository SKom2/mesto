import {Card} from "./Card";
import {PopupWithImage} from "./PopupWithImage";
import {photoPopup} from "../utils/constants";

export class Section {
    constructor({ items, renderer }, containerSelector){
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(){
        this._renderedItems.forEach(this._renderer)
    }

    renderCard (item) {
        const popupWithImage = new PopupWithImage('#popup_photo');
        const card = new Card(item, '#card-template', {
            handleCardClick: (data) => {
                    popupWithImage.open(data);
                }
            });
        const cardElement = card.generateCard();
        this.addItem(cardElement);
    }
}
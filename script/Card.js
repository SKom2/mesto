import { openPopup } from "./index.js";

export class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _setData() {
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__title').textContent = this._title;
    }

    _handleOpenPopup() {
        const photoPopupImage = document.querySelector('.popup__image');
        const photoPopupTitle = document.querySelector('.popup__title');
        const photoPopup = document.querySelector('#popup_photo');
        photoPopupImage.src = this._image;
        photoPopupImage.alt = this._title;
        photoPopupTitle.textContent = this._title;
        openPopup(photoPopup);
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        const like = this._element.querySelector('.card__like');
        like.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        const deleteButton = this._element.querySelector('.card__delete');
        deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            this._handleOpenPopup();
        })
        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', () => {
            this._likeCard();
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setData();
        this._setEventListeners();

        return this._element;
    }

}

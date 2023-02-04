export class Card {
    constructor(data, templateSelector, handleOpenPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
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
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
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
        this._deleteButton = this._element.querySelector('.card__delete');
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })
        this._cardOpenImageButton = this._element.querySelector('.card__open-image-button');
        this._cardOpenImageButton.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link);
        });
        this._cardLike = this._element.querySelector('.card__like');
        this._cardLike.addEventListener('click', () => {
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

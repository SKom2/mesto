export class Card {
    constructor(data, templateSelector, {handleCardClick}) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName = this._element.querySelector('.card__title')
        this._cardName.textContent = this._name;
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        this._like = this._element.querySelector('.card__like');
        this._like.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        this._deleteButton = this._element.querySelector('.card__delete');
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
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

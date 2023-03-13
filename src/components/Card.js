export class Card {
    constructor(data, templateSelector, {handleCardClick, handleLikeClick, handleDeleteButtonClick}, userId) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._cardId = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
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

    _isLiked() {
        let isLiked = false;
        this._likes.forEach((like) => {
            if (like._id === this._userId) {
                isLiked = true;
            }
        })
        return isLiked;
    }

    numberOfLikes (number) {
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._likeCounter.textContent = number;
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteButtonClick(this._cardId, this._element);
        })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
        this._cardLike.addEventListener('click', () => {
            this._cardLike.classList.toggle('card__like_active')
            if (this._cardLike.classList.contains('card__like_active')){
                this._handleLikeClick('PUT', this._cardId);
            } else {
                this._handleLikeClick('DELETE', this._cardId);
            }
        })
    }

    removeCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this.numberOfLikes(this._likes.length);
        this._cardLike = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__delete');
        if (this._isLiked()) {
            this._cardLike.classList.add('card__like_active')
        }
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
        }
        this._setData();
        this._setEventListeners();
        return this._element;
    }
}

export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape'){
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton = this._popupSelector.querySelector('.popup__close');
        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popupSelector.addEventListener('mousedown', (evt) => {
            if(evt.target === this._popupSelector){
                this.close();
            }
        })

        document.addEventListener('keydown', this._handleEscClose);
    }
}
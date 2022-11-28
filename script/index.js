const editButton = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
};

function closePopup(){
    popup.classList.remove('popup_opened');    
};

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

formElement.addEventListener('submit',  saveForm);

function saveForm(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    document.querySelector('.profile__title').textContent = nameInputValue;
    document.querySelector('.profile__subtitle').textContent = jobInputValue;
    popup.classList.remove('popup_opened');
}

const like = document.querySelectorAll('.card__like');

function likeActive(likeNum) {
    likeNum.classList.toggle('card__like_active');
}

for(let i = 0; i < like.length; i++){
    like[i].addEventListener('click', function(){
        likeActive(like[i])
    });
};



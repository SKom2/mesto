

export class UserInfo {
    constructor({ nameSelector, aboutUserSelector, userSelector }) {
        this._name = document.querySelector(nameSelector);
        this._aboutUser = document.querySelector(aboutUserSelector);
        this._userAvatar = document.querySelector(userSelector);
    }

    getUserInfo () {
        return { name: this._name.textContent, about: this._aboutUser.textContent }
    }

    setUserInfo (data) {
        this._name.textContent = data.name;
        this._aboutUser.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._userId = data._id;
    }

    getUserId() {
        return this._userId;
    }
}
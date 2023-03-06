

export class UserInfo {
    constructor({ nameSelector, aboutUserSelector }) {
        this._name = document.querySelector(nameSelector);
        this._aboutUser = document.querySelector(aboutUserSelector);
    }

    getUserInfo () {
        return { name: this._name.textContent, about: this._aboutUser.textContent }
    }

    setUserInfo (data) {
        this._name.textContent = data.name;
        this._aboutUser.textContent = data.about;
        this._userId = data._id;
    }

    getUserId() {
        return this._userId;
    }
}
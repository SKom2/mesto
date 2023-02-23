

export class UserInfo {
    constructor({ nameSelector, aboutUserSelector }) {
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutUserSelector = document.querySelector(aboutUserSelector);
    }

    getUserInfo () {
        return { name: this._nameSelector.textContent, about: this._aboutUserSelector.textContent }
    }

    setUserInfo (data) {
        this._nameSelector.textContent = data.name;
        this._aboutUserSelector.textContent = data.about;
    }
}
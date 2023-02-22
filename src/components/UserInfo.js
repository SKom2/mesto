

export class UserInfo {
    constructor({ nameSelector, aboutUserSelector }) {
        this._nameSelector = nameSelector;
        this._aboutUserSelector = aboutUserSelector;
    }

    getUserInfo () {
        return { name: this._nameSelector.textContent, about: this._aboutUserSelector.textContent }
    }

    setData (nameInput, aboutInput) {
        const data = this.getUserInfo();
        nameInput.value = data.name;
        aboutInput.value = data.about;
    }

    setUserInfo (data) {
        this._nameSelector.textContent = data.name;
        this._aboutUserSelector.textContent = data.about;
    }
}
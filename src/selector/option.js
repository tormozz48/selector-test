'use strict';

export default class Option {
    constructor(option) {
        if (typeof option === 'string') {
            option = {label: option, value: option};
        }

        this._label = option.label;
        this._value = option.value;
        this._active = option.active;
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    hasValue(value) {
        return this.value === value;
    }

    isActive() {
        return this._active;
    }

    makeActive() {
        this._active = true;
    }

    makeInactive() {
        this._active = false;
    }
};

'use strict';

import Option from './option';

export default class State {
    constructor() {
        this._options = [];
    }

    setValueList(values) {
        this._options = values.map((v) => new Option(v));
    }

    getValuesList() {
        return this._options;
    }

    setValue(value) {
        this._options.forEach((option) => option.makeInactive());
        this._options
            .filter((option) => option.hasValue(value))
            .map((option) => option.makeActive());
    }

    getValue() {
        const activeOption = this._options.filter((option) => option.isActive())[0];
        return activeOption ? activeOption.value : null;
    }
};

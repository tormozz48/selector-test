'use strict';

import Option from './option';

export default class State {
    private _options: Array<Option>;

    public constructor() {
        this._options = [];
    }

    public setValueList(values: Array<Object>): void {
        this._options = values.map((v) => new Option(v));
    }

    public getValuesList(): Array<Option> {
        return this._options;
    }

    public setValue(value: string): void {
        this._options.forEach((option) => option.makeInactive());
        this._options
            .filter((option) => option.hasValue(value))
            .map((option) => option.makeActive());
    }

    public getValue() {
        const activeOption = this._options.filter((option) => option.isActive())[0];
        return activeOption ? activeOption.value : null;
    }
};

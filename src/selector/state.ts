'use strict';

import Option from './option';

/**
 * @class State
 * @description Represents selector state
 */
export default class State {
    private _options: Array<Option>;

    /**
     * @constructor
     */
    public constructor() {
        this._options = [];
    }

    /**
     * Sets list of selector options
     * @param {Object[]|String[]} values
     */
    public setValueList(values: Array<Object|String>): void {
        this._options = values.map((v) => new Option(v));
    }

    /**
     * Returns list of selector options
     * @returns {Array<Option>}
     */
    public getValuesList(): Array<Option> {
        return this._options;
    }

    /**
     * Sets selector value
     * @param {String|Number} value
     */
    public setValue(value: string|number): void {
        this._options.forEach((option) => option.makeInactive());
        this._options
            .filter((option) => option.hasValue(value))
            .map((option) => option.makeActive());
    }

    /**
     * Returns selector value
     * @returns {String|Number|null}
     */
    public getValue(): string|number|null {
        const activeOption = this._options.filter((option) => option.isActive())[0];
        return activeOption ? activeOption.value : null;
    }
};

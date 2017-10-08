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
     * Initialize state
     * @returns {State}
     * @static
     */
    public static create() {
        return new State();
    }

    /**
     * Sets list of selector options
     * @param {Object[]|String[]} values
     */
    public setValueList(values: Array<Object|String>): void {
        this._options = values.map((v) => new Option(v));

        const hasActiveOption = this.getValuesList().some((option) => option.isActive());

        if(!hasActiveOption && this.getValuesList().length) {
            this._options[0].makeActive();
        }
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
         this.getValuesList().forEach((option) => {
            option.hasValue(value) ? option.makeActive() : option.makeInactive();
         });
    }

    /**
     * Returns selector value
     * @returns {String|Number|null}
     */
    public getValue(): string|number|null {
        const activeOption = this.getValuesList().filter((option) => option.isActive())[0];
        return activeOption ? activeOption.value : null;
    }
};

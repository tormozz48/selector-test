'use strict';

/**
 * @class Option
 * @description Represents selector option model
 */
export default class Option {
    private _label: string;
    private _value: string;
    private _active: boolean;

    /**
     * @constructor
     * @param {Object|String} option data
     */
    public constructor(option: any) {
        if (typeof option === 'string') {
            option = {label: option, value: option};
        }

        this._label = option.label;
        this._value = option.value;
        this._active = option.active;
    }

    /**
     * Returns option label
     * @returns {String}
     */
    public get label(): string {
        return this._label;
    }

    /**
     * Returns option value
     * @returns {String|Number}
     */
    public get value(): string {
        return this._value;
    }

    /**
     * Returns true if option value equals to given. Otherwise returns false
     * @param {String|Number} value
     * @returns {Boolean}
     */
    public hasValue(value: string|number): boolean {
        return this.value === value;
    }

    /**
     * Returns true if option is active. Otherwise returns false
     * @returns {Boolean}
     */
    public isActive(): boolean {
        return Boolean(this._active);
    }

    /**
     * Make option active
     */
    public makeActive(): void {
        this._active = true;
    }

    /**
     * Make option inactive
     */
    public makeInactive(): void {
        this._active = false;
    }
};

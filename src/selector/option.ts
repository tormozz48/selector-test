'use strict';

export default class Option {
    private _label: string;
    private _value: string;
    private _active: boolean;

    public constructor(option: any) {
        if (typeof option === 'string') {
            option = {label: option, value: option};
        }

        this._label = option.label;
        this._value = option.value;
        this._active = option.active;
    }

    public get label(): string {
        return this._label;
    }

    public get value(): string {
        return this._value;
    }

    public hasValue(value: string): boolean {
        return this.value === value;
    }

    public isActive(): boolean {
        return Boolean(this._active);
    }

    public makeActive(): void {
        this._active = true;
    }

    public makeInactive(): void {
        this._active = false;
    }
};

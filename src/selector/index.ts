'use strict';

import $ = require('jquery');
import State from './state';

export default class Selector {
    private _element: any;
    private _state: State;

    public constructor(selectId: string) {
        this._element = $(selectId);
        this._state = new State();
        this._trigger(Selector.EVENTS.INIT);
    }

    public static get EVENTS() : any {
        return {
            INIT: 'init',
            BEFORE_SET_VALUE_LIST: 'beforeSetValueList',
            AFTER_SET_VALUE_LIST: 'afterSetValueList',
            BEFORE_SET_VALUE: 'beforeSetValue',
            AFTER_SET_VALUE: 'afterSetValue',
            BEFORE_RENDER: 'beforeRender',
            AFTER_RENDER: 'afterRender',
        };
    }

    public getElement(): any {
        return this._element;
    }

    public setListener(listener: Function): void {
        const events = Selector.EVENTS;
        Object.keys(events).forEach((eventKey) => {
            this.getElement().on(events[eventKey], (event: any, ...data: Array<any>) => listener(event.type, data));
        });
    }

    public setValueList(values: Array<Object>): void {
        this._trigger(Selector.EVENTS.BEFORE_SET_VALUE_LIST, values);
        this._state.setValueList(values);
        this._render();
        this._trigger(Selector.EVENTS.AFTER_SET_VALUE_LIST, values);
    }

    public setValue(value: string): void {
        this._trigger(Selector.EVENTS.BEFORE_SET_VALUE, value);
        this._state.setValue(value);
        this._render();
        this._trigger(Selector.EVENTS.AFTER_SET_VALUE, value);
    }

    public getValue(): string {
        return this._state.getValue();
    }

    private _trigger(event: string, params?: any) {
        this.getElement().trigger(event, params);
    }

    private _render(): void {
        this._trigger(Selector.EVENTS.BEFORE_RENDER);
        this.getElement().empty();
        this._state.getValuesList().forEach((option) => {
            const $option = $('<option/>')
                .val(option.value)
                .text(option.label)
                .prop('selected', option.isActive());

            this.getElement().append($option);
        });
        this._trigger(Selector.EVENTS.AFTER_RENDER);
    }
}

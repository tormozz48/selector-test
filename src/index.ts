'use strict';

import $ = require('jquery');
import State from './state';

/**
 * @class Selector
 * @description Custom selector component
 */
export default class Selector {
    public static EVENTS: any = {
        BEFORE_SET_VALUE_LIST: 'beforeSetValueList',
        AFTER_SET_VALUE_LIST: 'afterSetValueList',
        BEFORE_SET_VALUE: 'beforeSetValue',
        AFTER_SET_VALUE: 'afterSetValue',
        BEFORE_RENDER: 'beforeRender',
        AFTER_RENDER: 'afterRender',
    };

    private _element: any;
    private _state: State;

    /**
     * @constructor
     * @param {String} selectId - jquery selector
     */
    public constructor(selectId: string) {
        this._element = this.get$()(selectId);
        this._state = State.create();
    }

    //suitable for testing purposes
    public get$(): any {
        return $;
    }

    /**
     * Returns native jQuery element
     * @returns {JQuery}
     */
    public getElement(): any {
        return this._element;
    }

    /**
     * Sets event listener
     * @param {Function} listener
     */
    public setListener(listener: Function): void {
        const events = Selector.EVENTS;
        Object.keys(events).forEach((eventKey) => {
            this.getElement().on(
                events[eventKey],
                (event: any, ...data: Array<any>) => listener(event.type, data));
        });
    }

    /**
     * Sets option value list
     * @param {Object[]} values
     */
    public setValueList(values: Array<Object>): void {
        this._trigger(Selector.EVENTS.BEFORE_SET_VALUE_LIST, values);
        this._state.setValueList(values);
        this._render();
        this._trigger(Selector.EVENTS.AFTER_SET_VALUE_LIST, values);
    }

    /**
     * Sets selector value
     * @param {String|Number} value
     */
    public setValue(value: string|number): void {
        this._trigger(Selector.EVENTS.BEFORE_SET_VALUE, value);
        this._state.setValue(value);
        this._render();
        this._trigger(Selector.EVENTS.AFTER_SET_VALUE, value);
    }

    /**
     * Returns selector value
     * @returns {String|Number|null}
     */
    public getValue(): string|number {
        return this._state.getValue();
    }

    /**
     * Triggers given component event with params
     * @param {String} event name
     * @param {Array<*>} [params] event data
     * @private
     */
    private _trigger(event: string, params?: any) {
        this.getElement().trigger(event, params);
    }

    /**
     * Component render method
     * @private
     */
    private _render(): void {
        this._trigger(Selector.EVENTS.BEFORE_RENDER);
        this.getElement().empty();
        this._state.getValuesList().forEach((option) => {
            const $option = this.get$()('<option/>')
                .val(option.value)
                .text(option.label)
                .prop('selected', option.isActive());

            this.getElement().append($option);
        });
        this._trigger(Selector.EVENTS.AFTER_RENDER);
    }
}

'use strict';

import $ from 'jquery';
import State from './state';

export default class Selector {
    constructor(selectId) {
        this._element = $(selectId);
        this._state = new State();
        this._trigger(this.constructor.EVENTS.INIT);
    }

    static get EVENTS() {
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

    getElement() {
        return this._element;
    }

    setListener(listener=() => {}) {
        const events = this.constructor.EVENTS;
        Object.keys(events).forEach((eventKey) => {
            this.getElement().on(events[eventKey], (event, ...data) => listener(event.type, data));
        });
    }

    setValueList(values=[]) {
        this._trigger(this.constructor.EVENTS.BEFORE_SET_VALUE_LIST, values);
        this._state.setValueList(values);
        this._render();
        this._trigger(this.constructor.EVENTS.AFTER_SET_VALUE_LIST, values);
    }

    setValue(value) {
        this._trigger(this.constructor.EVENTS.BEFORE_SET_VALUE, value);
        this._state.setValue(value);
        this._render();
        this._trigger(this.constructor.EVENTS.AFTER_SET_VALUE, value);
    }

    getValue() {
        return this._state.getValue();
    }

    _trigger(event, params) {
        this.getElement().trigger(event, params);
    }

    _render() {
        this._trigger(this.constructor.EVENTS.BEFORE_RENDER);
        this.getElement().empty();
        this._state.getValuesList().forEach((option) => {
            const $option = $('<option/>')
                .val(option.value)
                .text(option.label)
                .attr('selected', option.isActive());

            this.getElement().append($option);
        });
        this._trigger(this.constructor.EVENTS.AFTER_RENDER);
    }
}

'use strict';

import {assert} from 'chai';
import State from '../../src/state';

describe('src/selector/state', () => {
    it('should initialize state with empty options set', () => {
        const state = new State();

        assert.lengthOf(state.getValuesList(), 0);
    });

    describe('setValueList', () => {
        it('should set options list', () => {
            const state = new State();

            state.setValueList([
                {label: 'foo1', value: 'bar1'},
                {label: 'foo2', value: 'bar2', active: true},
            ]);

            assert.lengthOf(state.getValuesList(), 2);
            assert.equal(state.getValuesList()[0].value, 'bar1');
            assert.equal(state.getValuesList()[1].value, 'bar2');
        });

        it('should set first option as active if there no active options were set', () => {
            const state = new State();

            state.setValueList([
                {label: 'foo1', value: 'bar1'},
                {label: 'foo2', value: 'bar2'},
            ]);

            assert.equal(state.getValue(), 'bar1');
        });
    });

    describe('setValue', () => {
        it('should set active option', () => {
            const state = new State();

            state.setValueList([
                {label: 'foo1', value: 'bar1'},
                {label: 'foo2', value: 'bar2', active: true},
                {label: 'foo3', value: 'bar3'},
            ]);

            assert.equal(state.getValue(), 'bar2');
            state.setValue('bar3');
            assert.equal(state.getValue(), 'bar3');
        });
    });

    describe('getValue',  () => {
        it('should return value of active option', () => {
            const state = new State();

            state.setValueList([
                {label: 'foo1', value: 'bar1'},
                {label: 'foo2', value: 'bar2', active: true},
            ]);

            assert.equal(state.getValue(), 'bar2');
        });

        it('should return null if there no active options', () => {
            const state = new State();

            assert.isNull(state.getValue());
        });
    });
});

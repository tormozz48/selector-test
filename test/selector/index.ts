'use strict';

import $ = require('jquery');
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import State from '../../src/state';
import Selector from '../../src/index';

chai.use(sinonChai);

//почему-то не завелся chai.assert c "sinon-chai"
const expect = chai.expect;

describe('src/selector/index', () => {
    const sandbox = sinon.sandbox.create();
    let $stub: any;

    beforeEach(() => {
        $stub = {
            constructor: sandbox.stub().returns($stub),
            empty: sandbox.stub(),
            append: sandbox.stub(),
            trigger: sandbox.stub(),
            val: sandbox.stub().returnsThis(),
            text: sandbox.stub().returnsThis(),
            prop: sandbox.stub().returnsThis(),
            on: sandbox.stub()
        };
        sandbox.stub(Selector.prototype, 'get$').returns($stub.constructor);
        sandbox.stub(Selector.prototype, 'getElement').returns($stub);
    });

    afterEach(() => sandbox.restore());

    describe('initialization', () => {
        it('should create state', () => {
            sandbox.stub(State, 'create');

            const selector = new Selector('some-selector');

            expect(State.create).to.be.calledOnce;
        });

        it('should initialize $ instance on given selector', () => {
            const selector = new Selector('some-selector');

            expect($stub.constructor).to.be.calledOnce;
            expect($stub.constructor).to.be.calledWith('some-selector');
        });
    });

    describe('setValueList', () => {
        it('should set given selector options', () => {
            sandbox.stub(State.prototype, 'setValueList');

            const selector = new Selector('some-selector');
            selector.setValueList([{label: 'foo', value: 'bar'}]);

            expect(State.prototype.setValueList).to.be.calledOnce;
            expect(State.prototype.setValueList).to.be.calledWith([{label: 'foo', value: 'bar'}]);
        });

        it('should re-render component after changing state', () => {
            const selector = new Selector('some-selector');
            selector.setValueList([{label: 'foo', value: 'bar'}]);

            expect($stub.empty).to.be.calledOnce;
            expect($stub.append).to.be.calledOnce;
        });

        it('should trigger "beforeSetValueList" before setting options list', () => {
            const setValueList = sandbox.spy(State.prototype, 'setValueList');

            const selector = new Selector('some-selector');
            selector.setValueList([{label: 'foo', value: 'bar'}]);

            expect($stub.trigger).to.be.calledWith('beforeSetValueList');
            expect($stub.trigger).to.be.calledBefore(setValueList);
        });

        it('should trigger "afterSetValueList" after setting options list', () => {
            const setValueList = sandbox.spy(State.prototype, 'setValueList');

            const selector = new Selector('some-selector');
            selector.setValueList([{label: 'foo', value: 'bar'}]);

            expect($stub.trigger).to.be.calledWith('afterSetValueList');
            expect($stub.trigger).to.be.calledAfter(setValueList);
        });
    });

    describe('setValue', () => {
        let selector: Selector;

        beforeEach(() => {
            selector = new Selector('some-selector');
            selector.setValueList([
                {label: 'foo1', value: 'bar1', active: true},
                {label: 'foo2', value: 'bar2'}
            ]);
        });

        it('should set given selector value', () => {
            selector.setValue('bar2');

            expect(selector.getValue()).to.be.equal('bar2');
        });

        it('should re-render component after changing state', () => {
            const setValue = sandbox.spy(State.prototype, 'setValue');

            selector.setValue('bar2');

            expect($stub.empty).to.be.calledAfter(setValue);
            expect($stub.append).to.be.calledAfter(setValue);
        });

        it('should trigger "beforeSetValue" before setting options list', () => {
            const setValue = sandbox.spy(State.prototype, 'setValue');

            selector.setValue('bar2');

            expect($stub.trigger).to.be.calledWith('beforeSetValue');
            expect($stub.trigger).to.be.calledBefore(setValue);
        });

        it('should trigger "afterSetValue" after setting options list', () => {
            const setValue = sandbox.spy(State.prototype, 'setValue');

            selector.setValue('bar2');

            expect($stub.trigger).to.be.calledWith('afterSetValue');
            expect($stub.trigger).to.be.calledAfter(setValue);
        });
    });

    describe('setListener', () => {
        let selector: Selector;

        beforeEach(() => {
            selector = new Selector('some-selector');
        });

        describe('should subscribe on', () => {
            const events = Selector.EVENTS;
            Object.keys(events).forEach((eventKey) => {
                it(`"${events[eventKey]}" event`, () => {
                    selector.setListener(sandbox.spy());
                    expect($stub.on).to.be.calledWith(events[eventKey]);
                });
            });
        });

        it('should receive event name on event triggering', () => {
            const listener = sandbox.spy();
            $stub.on.callsArgWith(1, {type: 'some-event'}, 'custom-data');

            selector.setListener(listener);
            selector.setValueList([]);

            expect(listener).to.be.calledWith('some-event');
        });

        it('should receive advanced event data on event triggering', () => {
            const listener = sandbox.spy();
            $stub.on.callsArgWith(1, {type: 'some-event'}, 'custom-data');

            selector.setListener(listener);
            selector.setValueList([]);

            expect(listener).to.be.calledWith(sinon.match.string, ['custom-data']);
        });
    });
});

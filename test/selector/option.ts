import {assert} from 'chai';
import Option from '../../src/selector/option';

describe('src/selector/option', () => {
    it('should create option with given option data object', () => {
        const option = new Option({label: 'foo', value: 'bar'});

        assert.equal(option.label, 'foo');
        assert.equal(option.value, 'bar');
        assert.isFalse(option.isActive());
    });

    it('should create active option with given option data object', () => {
        const option = new Option({label: 'foo', value: 'bar', active: true});

        assert.equal(option.label, 'foo');
        assert.equal(option.value, 'bar');
        assert.isTrue(option.isActive());
    });

    it('should create option from string args', () => {
        const option = new Option('foo-str');

        assert.equal(option.label, 'foo-str');
        assert.equal(option.value, 'foo-str');
        assert.isFalse(option.isActive());
    });

    describe('hasValue', () => {
        it('should return true if option value is equal to given', () => {
            const option = new Option({label: 'foo', value: 'bar'});

            assert.isTrue(option.hasValue('bar'));
        });

        it('should return false if option value diffs from given', () => {
            const option = new Option({label: 'foo', value: 'bar'});

            assert.isFalse(option.hasValue('some-another'));
        });
    });

    describe('change active state', () => {
        it('makeActive method should set option as active', () => {
            const option = new Option({label: 'foo', value: 'bar'});

            assert.isFalse(option.isActive());
            option.makeActive();
            assert.isTrue(option.isActive());
        });

        it('makeInactive method should set option as inactive', () => {
            const option = new Option({label: 'foo', value: 'bar', active: true});

            assert.isTrue(option.isActive());
            option.makeInactive();
            assert.isFalse(option.isActive());
        });
    });
});

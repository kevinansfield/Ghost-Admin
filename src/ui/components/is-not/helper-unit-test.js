/* jshint expr:true */
import {
    describe,
    it
} from 'mocha';
import {expect} from 'chai';
import {
    isNot
} from 'ghost-admin/src/ui/components/is-not/helper';

describe('Unit: Helper: is-not', function () {
    // Replace this with your real tests.
    it('works', function () {
        let result = isNot(false);

        expect(result).to.be.ok;
    });
});

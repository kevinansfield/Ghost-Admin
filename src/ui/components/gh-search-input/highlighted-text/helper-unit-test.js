/* jshint expr:true */
import {
  describe,
  it
} from 'mocha';
import {expect} from 'chai';
import {
  highlightedText
} from 'ghost-admin/src/ui/components/gh-search-input/highlighted-text/helper';

describe('Unit: Helper: highlighted-text', function() {

    it('works', function() {
        let result = highlightedText(['Test', 'e']);
        expect(result).to.be.an('object');
        expect(result.string).to.equal('T<span class="highlight">e</span>st');
    });
});

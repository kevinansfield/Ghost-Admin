import {countDownCharacters} from 'ghost-admin/src/ui/components/gh-count-down-characters/helper';
import {describe, it} from 'mocha';
import {expect} from 'chai';

describe('Unit: Helper: gh-count-down-characters', function() {
    let validStyle = 'color: rgb(159, 187, 88);';
    let errorStyle = 'color: rgb(226, 84, 64);';

    it('counts chars', function() {
        let result = countDownCharacters(['test', 200]);
        expect(result.string)
            .to.equal(`<span class="word-count" style="${validStyle}">4</span>`);
    });

    it('warns with too many chars', function () {
        let result = countDownCharacters([Array(205 + 1).join('x'), 200]);
        expect(result.string)
            .to.equal(`<span class="word-count" style="${errorStyle}">205</span>`);
    });

    it('counts multibyte correctly', function () {
        let result = countDownCharacters(['💩', 200]);
        expect(result.string)
            .to.equal(`<span class="word-count" style="${validStyle}">1</span>`);

        // emoji + modifier is still two chars
        result = countDownCharacters(['💃🏻', 200]);
        expect(result.string)
            .to.equal(`<span class="word-count" style="${validStyle}">2</span>`);
    });
});

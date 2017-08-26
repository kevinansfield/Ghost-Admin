import EmberObject from '@ember/object';
import ValidationEngine from 'ghost-admin/src/utils/mixins/validation-engine/mixin';
import {computed} from '@ember/object';
import {isBlank} from '@ember/utils';

export default EmberObject.extend(ValidationEngine, {
    label: '',
    url: '',
    isNew: false,

    validationType: 'navItem',

    isComplete: computed('label', 'url', function () {
        let {label, url} = this.getProperties('label', 'url');

        return !isBlank(label) && !isBlank(url);
    }),

    isBlank: computed('label', 'url', function () {
        let {label, url} = this.getProperties('label', 'url');

        return isBlank(label) && isBlank(url);
    })
});

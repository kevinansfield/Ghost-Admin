import EmberObject from '@ember/object';
import ValidationEngine from "ghost-admin/src/utils/mixins/validation-engine/mixin";
import {computed} from '@ember/object';
import {isBlank} from '@ember/utils';

export default EmberObject.extend(ValidationEngine, {
    // values entered here will act as defaults
    url: '',

    validationType: 'slackIntegration',

    isActive: computed('url', function () {
        let url = this.get('url');
        return !isBlank(url);
    })
});

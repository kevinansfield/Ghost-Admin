import EmberObject from '@ember/object';
import ValidationEngine from "ghost-admin/src/utils/mixins/validation-engine/mixin";

export default EmberObject.extend(ValidationEngine, {
    // values entered here will act as defaults
    applicationId: '',

    validationType: 'unsplashIntegration',

    isActive: false
});

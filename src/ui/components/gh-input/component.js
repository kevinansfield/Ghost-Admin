import OneWayInput from 'ember-one-way-controls/components/one-way-input';
import TextInputMixin from 'ghost-admin/src/utils/mixins/text-input';

export default OneWayInput.extend(TextInputMixin, {
    classNames: 'gh-input'
});

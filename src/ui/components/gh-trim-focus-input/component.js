import GhostInput from 'ghost-admin/src/ui/components/gh-input/component';

/**
 * This doesn't override the OneWayInput component because
 * we need finer control. It borrows
 * parts from both the OneWayInput component and Ember's default
 * input component
 */
const TrimFocusInputComponent = GhostInput.extend({

    shouldFocus: true,

    focusOut(event) {
        this._trimInput(event.target.value);
    },

    _trimInput(value) {
        if (value && typeof value.trim === 'function') {
            value = value.trim();
        }

        this._processNewValue(value);
    }
});

export default TrimFocusInputComponent;

import ModalComponent from 'ghost-admin/src/ui/components/modal-base/component';
import {invokeAction} from 'ember-invoke-action';

export default ModalComponent.extend({
    actions: {
        confirm() {
            invokeAction(this, 'confirm').finally(() => {
                this.send('closeModal');
            });
        }
    }
});

import ModalComponent from 'ghost-admin/src/ui/components/modal-base/component';
import {alias} from '@ember/object/computed';

export default ModalComponent.extend({
    generatedHtml: alias('model')
});

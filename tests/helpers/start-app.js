import Application from '../../src/main';
import config from '../../config/environment';
import fileUpload from "./file-upload"; // eslint-disable-line
import registerPowerDatepickerHelpers from '../../tests/helpers/ember-power-datepicker';
import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';
import {assign} from '@ember/polyfills';
import {run} from '@ember/runloop';

registerPowerSelectHelpers();
registerPowerDatepickerHelpers();

export default function startApp(attrs) {
    let attributes = assign({}, config.APP);
    attributes = assign(attributes, attrs); // use defaults, but you can override;

    return run(() => {
        let application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
        return application;
    });
}

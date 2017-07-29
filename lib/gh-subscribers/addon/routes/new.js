import Route from 'ember-route';
import injectService from 'ember-service/inject';

export default Route.extend({

    store: injectService(),

    model() {
        return this.get('store').createRecord('subscriber');
    },

    deactivate() {
        let subscriber = this.controller.get('model');

        this._super(...arguments);

        if (subscriber.get('isNew')) {
            this.rollbackModel();
        }
    },

    rollbackModel() {
        let subscriber = this.controller.get('model');
        subscriber.rollbackAttributes();
    },

    actions: {
        save() {
            let subscriber = this.controller.get('model');
            return subscriber.save().then((saved) => {
                this.send('addSubscriber', saved);
                return saved;
            });
        },

        cancel() {
            this.rollbackModel();
            this.transitionTo('subscribers');
        }
    }
});

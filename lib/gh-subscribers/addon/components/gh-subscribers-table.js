import Component from 'ember-component';

export default Component.extend({
    classNames: ['subscribers-table'],

    table: null,

    didReceiveAttrs() {
        this._super(...arguments);
    },

    actions: {
        onScrolledToBottom() {
            let loadNextPage = this.get('loadNextPage');

            if (!this.get('isLoading')) {
                loadNextPage();
            }
        }
    }
});

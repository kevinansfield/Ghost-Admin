import AuthenticatedRoute from "ghost-admin/src/ui/routes/authenticated";

export default AuthenticatedRoute.extend({

    model() {
        return this.get('store').findAll('theme');
    },

    actions: {
        cancel() {
            this.transitionTo('settings.design');
        }
    }
});

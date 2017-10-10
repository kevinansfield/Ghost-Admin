import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default AuthenticatedRoute.extend({

    titleToken: 'Settings - Apps - Google News',
    classNames: ['settings-view-apps-google-news'],

    actions: {
        save() {
            this.get('controller').send('save');
        }
    }
});

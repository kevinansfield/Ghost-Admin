import AuthenticatedRoute from 'ghost-admin/src/ui/routes/authenticated';
import styleBody from 'ghost-admin/src/utils/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, {
    titleToken: 'Settings - Apps - Slack',

    classNames: ['settings-view-apps-slack'],

    actions: {
        save() {
            this.get('controller').send('save');
        }
    }
});

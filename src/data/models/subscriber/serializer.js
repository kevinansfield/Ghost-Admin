import ApplicationSerializer from 'ghost-admin/src/data/models/application/serializer';

export default ApplicationSerializer.extend({
    attrs: {
        unsubscribedAtUTC: {key: 'unsubscribed_at'},
        createdAtUTC: {key: 'created_at'},
        updatedAtUTC: {key: 'updated_at'}
    }
});

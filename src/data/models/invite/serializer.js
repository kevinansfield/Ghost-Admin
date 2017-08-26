import ApplicationSerializer from 'ghost-admin/src/data/models/application/serializer';

export default ApplicationSerializer.extend({
    attrs: {
        role: {key: 'role_id'},
        createdAtUTC: {key: 'created_at'},
        updatedAtUTC: {key: 'updated_at'}
    }
});

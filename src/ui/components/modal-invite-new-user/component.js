import ModalComponent from 'ghost-admin/src/ui/components/modal-base/component';
import RSVP from 'rsvp';
import ValidationEngine from 'ghost-admin/src/utils/mixins/validation-engine/mixin';
import {A as emberA} from '@ember/array';
import {inject as injectService} from '@ember/service';
import {run} from '@ember/runloop';
import {task} from 'ember-concurrency';

const {Promise} = RSVP;

export default ModalComponent.extend(ValidationEngine, {
    classNames: 'modal-content invite-new-user',

    role: null,
    roles: null,
    authorRole: null,

    validationType: 'inviteUser',

    notifications: injectService(),
    store: injectService(),

    init() {
        this._super(...arguments);

        // populate roles and set initial value for the dropdown
        run.schedule('afterRender', this, function () {
            this.get('store').query('role', {permissions: 'assign'}).then((roles) => {
                let authorRole = roles.findBy('name', 'Author');

                this.set('roles', roles);
                this.set('authorRole', authorRole);

                if (!this.get('role')) {
                    this.set('role', authorRole);
                }
            });
        });
    },

    willDestroyElement() {
        this._super(...arguments);
        // TODO: this should not be needed, ValidationEngine acts as a
        // singleton and so it's errors and hasValidated state stick around
        this.get('errors').clear();
        this.set('hasValidated', emberA());
    },

    validate() {
        let email = this.get('email');

        // TODO: either the validator should check the email's existence or
        // the API should return an appropriate error when attempting to save
        return new Promise((resolve, reject) => {
            return this._super().then(() => {
                return RSVP.hash({
                    users: this.get('store').findAll('user', {reload: true}),
                    invites: this.get('store').findAll('invite', {reload: true})
                }).then((data) => {
                    let existingUser = data.users.findBy('email', email);
                    let existingInvite = data.invites.findBy('email', email);

                    if (existingUser || existingInvite) {
                        this.get('errors').clear('email');
                        if (existingUser) {
                            this.get('errors').add('email', 'A user with that email address already exists.');
                        } else {
                            this.get('errors').add('email', 'A user with that email address was already invited.');
                        }

                        // TODO: this shouldn't be needed, ValidationEngine doesn't mark
                        // properties as validated when validating an entire object
                        this.get('hasValidated').addObject('email');
                        reject();
                    } else {
                        resolve();
                    }
                });
            }, () => {
                // TODO: this shouldn't be needed, ValidationEngine doesn't mark
                // properties as validated when validating an entire object
                this.get('hasValidated').addObject('email');
                reject();
            });
        });
    },

    sendInvitation: task(function* () {
        let email = this.get('email');
        let role = this.get('role');
        let notifications = this.get('notifications');
        let notificationText = `Invitation sent! (${email})`;
        let invite;

        try {
            yield this.validate();

            invite = this.get('store').createRecord('invite', {
                email,
                role
            });

            yield invite.save();

            // If sending the invitation email fails, the API will still return a status of 201
            // but the invite's status in the response object will be 'invited-pending'.
            if (invite.get('status') === 'pending') {
                notifications.showAlert('Invitation email was not sent.  Please try resending.', {type: 'error', key: 'invite.send.failed'});
            } else {
                notifications.showNotification(notificationText, {key: 'invite.send.success'});
            }

            this.send('closeModal');
        } catch (error) {
            // validation will reject and cause this to be called with no error
            if (error) {
                invite.deleteRecord();
                notifications.showAPIError(error, {key: 'invite.send'});
                this.send('closeModal');
            }
        }
    }).drop(),

    actions: {
        setRole(role) {
            this.set('role', role);
        },

        confirm() {
            this.get('sendInvitation').perform();
        }
    }
});

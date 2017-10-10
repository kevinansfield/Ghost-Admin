/* eslint-disable camelcase */
import Model from 'ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';
import attr from 'ember-data/attr';

export default Model.extend(ValidationEngine, {
    validationType: 'setting',

    activeTimezone: attr('string', {defaultValue: 'Etc/UTC'}),
    amp: attr('boolean'),
    coverImage: attr('string'),
    defaultLocale: attr('string'),
    description: attr('string'),
    facebook: attr('facebook-url-user'),
    forceI18n: attr('boolean'),
    ghostFoot: attr('string'),
    ghostHead: attr('string'),
    googleNews: attr('json-string', {defaultValue() {
        return {isActive: false};
    }}),
    icon: attr('string'),
    isPrivate: attr('boolean'),
    labs: attr('string'),
    logo: attr('string'),
    navigation: attr('navigation-settings'),
    password: attr('string'),
    permalinks: attr('string'),
    publicHash: attr('string'),
    slack: attr('slack-settings'),
    title: attr('string'),
    twitter: attr('twitter-url-user'),
    unsplash: attr('unsplash-settings', {defaultValue() {
        return {isActive: true};
    }})
});

import Controller from '@ember/controller';
import {A} from '@ember/array';
import {alias} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as injectService} from '@ember/service';
import {task} from 'ember-concurrency';

export const NEWS_GENRES = [
    {value: 'PressRelease', name: 'Press Release'},
    {value: 'Satire', name: 'Satire'},
    {value: 'Blog', name: 'Blog'},
    {value: 'OpEd', name: 'Op-Ed'},
    {value: 'Opinion', name: 'Opinion'},
    {value: 'UserGenerated', name: 'User Generated'}
];

export default Controller.extend({
    config: injectService(),
    notifications: injectService(),
    settings: injectService(),

    googleNews: alias('settings.googleNews'),

    availableGenres: computed(function () {
        return NEWS_GENRES;
    }),

    selectedGenres: computed('googleNews.defaultGenres', function () {
        let availableGenres = this.get('availableGenres');
        let defaultGenres = this.get('googleNews.defaultGenres') || '';

        let selectedGenres = defaultGenres.split(', ').reduce(function (genres, genre) {
            if (genre) {
                genres.push(availableGenres.findBy('value', genre));
            }
            return genres;
        }, A([]));

        return selectedGenres || [];
    }),

    sitemapUrl: computed('config.blogUrl', function () {
        let blogUrl = this.get('config.blogUrl');

        return `${blogUrl}/sitemap-news.xml`;
    }),

    save: task(function* () {
        let settings = this.get('settings');

        try {
            return yield settings.save();
        } catch (error) {
            if (error) {
                this.get('notifications').showAPIError(error);
                throw error;
            }
        }
    }),

    actions: {
        updateDefaultGenres(genres) {
            let defaultGenres = genres.mapBy('value').join(', ');

            this.set('googleNews.defaultGenres', defaultGenres);
        },

        save() {
            this.get('save').perform();
        }
    }
});

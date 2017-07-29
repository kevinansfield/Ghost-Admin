import Engine from 'ember-engines/engine';
import Resolver from 'ember-resolver';
import config from './config/environment';
import loadInitializers from 'ember-load-initializers';

const {modulePrefix} = config;
const Eng = Engine.extend({
    modulePrefix,
    Resolver,

    dependencies: {
        externalRoutes: [
            'posts',
            'signin'
        ],
        services: [
            '-document', // needed for ember-wormhole https://github.com/yapplabs/ember-wormhole/issues/84
            'dropdown',
            'feature',
            'media',
            'notifications',
            'session',
            'store'
        ]
    }
});

loadInitializers(Eng, modulePrefix);

export default Eng;

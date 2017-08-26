import Ember from 'ember';
import Service from '@ember/service';
import ghostPaths from "ghost-admin/src/utils/ghost-paths/util";

// ember-cli-shims doesn't export _ProxyMixin
const {_ProxyMixin} = Ember;

export default Service.extend(_ProxyMixin, {
    content: ghostPaths()
});

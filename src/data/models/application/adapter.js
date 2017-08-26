import EmbeddedRelationAdapter from "ghost-admin/src/data/models/embedded-relation-adapter/adapter";

export default EmbeddedRelationAdapter.extend({

    shouldBackgroundReloadRecord() {
        return false;
    }

});

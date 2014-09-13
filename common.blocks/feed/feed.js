BN.addDecl('feed').onSetMod({
    js: function() {
        this._page = this.findBlockOutside('b-page');
        this._page.delMod('login');

        this._source = this.params.source;

        this.firstLoad();
    }
}).instanceProp({
    firstLoad: function(force) {
        this._page.setMod('loading', 'yes');

        this.loadPortion(force, this._source);
    },
    loadPortion: function(force, source) {

        BN('api-vk')._getPosts(source).then(function(data) {
            var _this = this,
                groupsId = [],
                news = [],
                items = data.items,
                action = force ? 'update' : 'append';

            data.items.forEach(function(item) {
                groupsId.push(String(item.source_id).slice(1));
            });

            BN('api-vk')._groupInfo(groupsId).then(function(data) {
                    data.forEach(function(gItem) {

                        items.forEach(function(item) {
                            var itemGID = String(item.source_id).slice(1);

                            if(+itemGID === gItem.id) {
                                item.name = gItem.name;
                                item.screen_name = gItem.screen_name;
                                item.photo = gItem.photo_100;
                            }

                        });

                    });
                var news = items.map(function(item) {
                    return {
                        block: 'box',
                        data: item
                    }
                }, _this);

                BN('i-content')[action](_this.domElem, news);

                setTimeout(function () {
                    _this._page.delMod('loading');
                }, 300);
            });

        }.bind(this)).fail(function(err) {
            console.log('fail');
            this._page.delMod('loading');
        }.bind(this));

    }
});

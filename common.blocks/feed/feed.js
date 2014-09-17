BN.addDecl('feed').onSetMod({
    js: function() {
        var sourceObj = BN('i-category').get(),
            paramsSource = this.params.source;

        this._page = this.findBlockOutside('b-page');
        this._source = [];

        this._page.setMod('feed', 'yes');

        /* Если зашли на страницу /feed/, то достаем названия выбранных юзером категорий из VK Storage.
           Иначе берём имя категории из параметров переданных из b-page и достаём id i-category.
         */
        if (paramsSource == 'user')  {
            this.getId();
        } else {
            this._source.push(sourceObj[paramsSource]);
            this.firstLoad();
        }
    }
}).instanceProp({
    getId: function () {
        var _this = this;

        BN('api-vk').getStorage().then(function (data) {
            var categoryObj = BN('i-category').get(),
                names = data.split(',');

            for(key in categoryObj) {
               names.forEach(function(item){
                  if(item === key) {
                      _this._source.push(categoryObj[key]);
                  }
               });
            }

            _this.firstLoad();
        });
    },

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

BN.addDecl('feed').onSetMod({
    js: function() {
        var sourceObj = BN('i-category').get(),
            paramsSource = this.params.source;

        this._page = this.findBlockOutside('b-page');
        this._loader = this._page.findBlockInside('loader');
        this._source = [];

        if (this._page.hasMod('category', 'yes')) {
            this._page.delMod('category');
        }
        this._page.setMod('feed', 'yes');

        /* Если зашли на страницу /feed/, то достаем названия выбранных юзером категорий из VK Storage.
           Иначе берём имя категории из параметров переданных из b-page и достаём id i-category.
         */
        if (paramsSource == 'user')  {
            this.getSourceName();
        } else {
            // Если нет категории, значит в урле id. Тогда подгружаем конкретный паблик
            this._source.push(sourceObj[paramsSource] || paramsSource.replace('', 'g'));
            this.firstLoad();
        }

        $(window).on('scroll', jQuery.throttle(this._onScroll.bind(this), 400));
    }
}).instanceProp({
    getSourceName: function () {
        var _this = this,
            categoryObj = BN('i-category').get(),
            LSSource = localStorage.getItem('VKSource');

        /* Если зашли первый раз - вытягиваем данные из VK Storage и записываем их в localStorage.
           В дальнейшем всегда вытягиваем и LS, ибо быстрее! */
        if(!LSSource) {
            BN('api-vk').getStorage().then(function (data) {
                _this.getSourceId(categoryObj, data);

                localStorage.setItem('VKSource', data);

                _this.firstLoad();
            });
        } else {
            this.getSourceId(categoryObj, LSSource);

            this.firstLoad();
        }
    },

    getSourceId: function (cat, names) {
        names = typeof names === 'string' ? names.split(',') : names;

        for(key in cat) {
            names.forEach(function(item){
                if(item === key) {
                    this._source.push(cat[key]);
                }
            }.bind(this));
        }
    },

    firstLoad: function(force) {
        this._loader.setMod('loading', 'yes');

        this.loadPortion(null, force, this._source);
    },
    loadPortion: function(url, force, source) {

        BN('api-vk')._getPosts(url, source).then(function(data) {
            var news = [],
                items = data.items,
                action = force ? 'update' : 'append';

            data.groups.forEach(function(gItem) {

                items.forEach(function(item) {
                    var itemGID = String(item.source_id).slice(1);

                    if(+itemGID === gItem.id) {
                        item.name = gItem.name;
                        item.screen_name = gItem.screen_name;
                        item.photo = gItem.photo_100;
                    }

                });

            });

            var news = items.map(function(item, pos) {
                pos === 0 && (item.isFirst = true);

                return {
                    block: 'box',
                    data: item
                }
            });

            BN('i-content')[action](this.domElem, news);

            setTimeout(function () {
                this._loader.delMod('loading');
            }.bind(this), 300);

            this._afterLoad(data.next_from);

        }.bind(this)).fail(function(err) {
            console.log('fail feed');
            this._loader.delMod('loading');
        }.bind(this));

    },
    _afterLoad: function(pager) {
        this._progress = false;
        this._nextUrl = pager;

        // последняя ли это страница
        this._isLastPage = !pager;
    },
    _onScroll: function() {
        var page = this._page.domElem;

        var scrollTop = page.scrollTop(),
            viewport = 1000 + scrollTop,
            scrollHeight = page.prop('scrollHeight');

        if (viewport >= scrollHeight - 600 && !this._progress) {
            this._progress = true;
            this.loadPortion(this._nextUrl, null, this._source);
        }
    }
});

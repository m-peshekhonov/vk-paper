BN.addDecl('category').onSetMod({
    js: function () {
        this._source = [];
        this._page = this.findBlockOutside('b-page');

        this._page.delMod('feed');

        var params = BN('i-router').getParams();
            LSSource = localStorage.getItem('VKSource');

        this.bindTo('item', 'click', function (e) {
            this.toggleMod($(e.data.domElem), 'active', 'yes');

            this.saveSourceId(e);
            this.setActiveButton();
        });

        /*  Если в хранилище есть рубрики, делаем их активными.
            Иначе this._source до клика на item остаётся пустым.
        */
        if (LSSource) {
            this.setActiveItem(LSSource);
        } else {
            BN('api-vk').getStorage().then(function (data) {
                if (!data.length) return;

                this.setActiveItem(data);
            }.bind(this));
        }

        this.bindTo('button', 'click', this.saveStorage);
    }
}).instanceProp({
    setActiveItem: function (data) {
        this._source = data.split(',');

        this.setActiveButton();

        this._source.forEach(function (item) {
            this.setMod(this.elem('item', 'type', item), 'active', 'yes');
        }.bind(this));
    },

    setActiveButton: function () {
        if(this._source.length) {
            this.setMod(this.elem('button'), 'active', 'yes');
        } else {
            this.delMod(this.elem('button'), 'active');
        }
    },

    saveSourceId: function (e) {
        var name = this.getMod($(e.data.domElem), 'type');

        (function addOrRemove(array, value) {
            var index = array.indexOf(value);

            !!~index ? array.splice(index, 1) : array.push(value);

            this._source = array;
        })(this._source, name);
    },

    saveStorage: function () {
        if (this.hasMod(this.elem('button'), 'active', 'yes')) {
            BN('api-vk').setStorage(this._source); // Сохраняем в VK Storage
            localStorage.setItem('VKSource', this._source); // Сохраняем в Local Storage

            BN('i-router').setPath('/feed');
        } else {
            this.elem('title').animate({marginLeft:'-=5'},  50)
                .animate({marginLeft:'+=10'}, 70)
                .animate({marginLeft:'-=8'},  80)
                .animate({marginLeft:'+=5'}, 100)
                .animate({marginLeft:'-=2'}, 120);
        }
    }
}).blockTemplate(function(ctx) {

    ctx.js(true);
    var params = BN('i-router').getParams(),
        hasBack = params.back;

    ctx.content([
        {
            elem: 'top',
            mix: { block: 'cf' },
            content: [
                hasBack ? {
                    block: 'link',
                    url: '/feed',
                    mix: { block: 'category', elem: 'title-link' },
                    content: 'Вернуться без сохранения'
                } : {
                    elem: 'title',
                    content: 'Выберите несколько категорий'
                },
                {
                    elem: 'button',
                    content: hasBack? 'Сохранить' : 'Начать читать'
                }
            ]
        },
        {
            elem: 'inner',
            content: [
                {
                    elem: 'item',
                    mods: { type: 'design' },
                    title: 'Арт и Дизайн'
                },
                {
                    elem: 'item',
                    mods: { type: 'polytics' },
                    title: 'Политика'
                },
                {
                    elem: 'item',
                    mods: { type: 'humor' },
                    title: 'Юмор'
                },
                {
                    elem: 'item',
                    mods: { type: 'games' },
                    title: 'Игры'
                },
                {
                    elem: 'item',
                    mods: { type: 'social' },
                    title: 'Соц. сети'
                },
                {
                    elem: 'item',
                    mods: { type: 'media' },
                    title: 'Медиа'
                },
                {
                    elem: 'item',
                    mods: { type: 'auto' },
                    title: 'Авто и мото'
                },
                {
                    elem: 'item',
                    mods: { type: 'travel' },
                    title: 'Путешествия'
                },
                {
                    elem: 'item',
                    mods: { type: 'movies' },
                    title: 'Всё о кино'
                },
                {
                    elem: 'item',
                    mods: { type: 'technology' },
                    title: 'Технологии'
                },
                {
                    elem: 'item',
                    mods: { type: 'apple' },
                    title: 'Apple'
                },
                {
                    elem: 'item',
                    mods: { type: 'android' },
                    title: 'Android'
                },
                {
                    elem: 'item',
                    mods: { type: 'sport' },
                    title: 'Спорт'
                },
                {
                    elem: 'item',
                    mods: { type: 'animals' },
                    title: 'Животные'
                },
                {
                    elem: 'item',
                    mods: { type: 'science' },
                    title: 'Наука'
                },
                {
                    elem: 'item',
                    mods: { type: 'photos' },
                    title: 'Фотография'
                }
            ]
        }
    ]);

}).elemTemplate({

    item: function(ctx) {
        var json = ctx.json();

        ctx.content({
            elem: 'item-title',
            content: json.title
        }, true);
    }

});

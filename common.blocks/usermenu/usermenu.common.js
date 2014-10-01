BN.addDecl('usermenu').onSetMod({
    js: function () {
        var _this = this,
            path = BN('i-router').getPath().split('/').filter(isNotEmpty);

        this._menu = this.findBlockInside('menu');
        this._matcher = path[path.length - 1];

        function isNotEmpty(item) {
            return item !== '';
        }

        this._setActivePage();

        BEM.channel('i-router').on('update', function() {
            var mathers = BN('i-router').getMatchers()[2];
            if(mathers) {
                _this._matcher = mathers.replace('/', '') || 'feed';

                _this._setActivePage();
            }
        });
    }
}).instanceProp({
    _setActivePage: function () {
        var item = this._menu.elem('item', 'type', this._matcher);

        this._menu.delMod(this._menu.elem('item'), 'active');
        this._menu.setMod(item, 'active', 'yes');
    }
}).blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
            {
                block: 'menu',
                mix: { block: 'usermenu', elem: 'menu' },
                content: [
                    {
                        elem: 'item',
                        url: '/feed/design/',
                        mods: { type: 'design' },
                        icon: 'spin',
                        content: 'Арт и дизайн'
                    },
                    {
                        elem: 'item',
                        url: '/feed/polytics/',
                        mods: { type: 'polytics' },
                        icon: 'users',
                        content: 'Политика'
                    },
                    {
                        elem: 'item',
                        url: '/feed/humor/',
                        mods: { type: 'humor' },
                        icon: 'wink',
                        content: 'Юмор'
                    },
                    {
                        elem: 'item',
                        url: '/feed/games/',
                        mods: { type: 'games' },
                        icon: 'game',
                        content: 'Игры'
                    },
                    {
                        elem: 'item',
                        url: '/feed/social/',
                        mods: { type: 'social' },
                        icon: 'vk',
                        content: 'Соц. сети'
                    },
                    {
                        elem: 'item',
                        url: '/feed/media/',
                        mods: { type: 'media' },
                        icon: 'media',
                        content: 'Медиа'
                    },
                    {
                        elem: 'item',
                        url: '/feed/auto/',
                        mods: { type: 'auto' },
                        icon: 'auto',
                        content: 'Авто и мото'
                    },
                    {
                        elem: 'item',
                        url: '/feed/travel/',
                        mods: { type: 'travel' },
                        icon: 'trip',
                        content: 'Путешествия'
                    },
                    {
                        elem: 'item',
                        url: '/feed/movies/',
                        mods: { type: 'movies' },
                        icon: 'movie',
                        content: 'Все о кино'
                    },
                    {
                        elem: 'item',
                        url: '/feed/technology/',
                        mods: { type: 'technology' },
                        icon: 'tech',
                        content: 'Технологии'
                    },
                    {
                        elem: 'item',
                        url: '/feed/apple/',
                        mods: { type: 'apple' },
                        icon: 'apple',
                        content: 'Apple'
                    },
                    {
                        elem: 'item',
                        url: '/feed/android/',
                        mods: { type: 'android' },
                        icon: 'android',
                        content: 'Android'
                    },
                    {
                        elem: 'item',
                        url: '/feed/sport/',
                        mods: { type: 'sport' },
                        icon: 'sport',
                        content: 'Спорт'
                    },
                    {
                        elem: 'item',
                        url: '/feed/animals/',
                        mods: { type: 'animals' },
                        icon: 'animal',
                        content: 'Животные'
                    },
                    {
                        elem: 'item',
                        url: '/feed/science/',
                        mods: { type: 'science' },
                        icon: 'science',
                        content: 'Наука'
                    },
                    {
                        elem: 'item',
                        url: '/feed/photos/',
                        mods: { type: 'photos' },
                        icon: 'picture',
                        content: 'Фото и видео'
                    }
                ]
            }
    ]);

});

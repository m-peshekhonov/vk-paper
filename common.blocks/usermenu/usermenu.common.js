BN.addDecl('usermenu').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
            {
                block: 'menu',
                mix: { block: 'usermenu', elem: 'menu' },
                content: [
                    {
                        elem: 'item',
                        url: '/feed/design/',
                        icon: 'spin',
                        content: 'Арт и дизайн'
                    },
                    {
                        elem: 'item',
                        url: '/feed/polytics/',
                        icon: 'users',
                        content: 'Политика'
                    },
                    {
                        elem: 'item',
                        url: '/feed/humor/',
                        icon: 'wink',
                        content: 'Юмор'
                    },
                    {
                        elem: 'item',
                        url: '/feed/games/',
                        icon: 'game',
                        content: 'Игры'
                    },
                    {
                        elem: 'item',
                        url: '/feed/social/',
                        icon: 'vk',
                        content: 'Соц. сети'
                    },
                    {
                        elem: 'item',
                        url: '/feed/media/',
                        icon: 'media',
                        content: 'Медиа'
                    },
                    {
                        elem: 'item',
                        url: '/feed/auto/',
                        icon: 'auto',
                        content: 'Авто и мото'
                    },
                    {
                        elem: 'item',
                        url: '/feed/travel/',
                        icon: 'trip',
                        content: 'Путешествия'
                    },
                    {
                        elem: 'item',
                        url: '/feed/movies/',
                        icon: 'movie',
                        content: 'Все о кино'
                    },
                    {
                        elem: 'item',
                        url: '/feed/technology/',
                        icon: 'tech',
                        content: 'Технологии'
                    },
                    {
                        elem: 'item',
                        url: '/feed/apple/',
                        icon: 'apple',
                        content: 'Apple'
                    },
                    {
                        elem: 'item',
                        url: '/feed/android/',
                        icon: 'android',
                        content: 'Android'
                    },
                    {
                        elem: 'item',
                        url: '/feed/sport/',
                        icon: 'sport',
                        content: 'Спорт'
                    },
                    {
                        elem: 'item',
                        url: '/feed/animals/',
                        icon: 'animal',
                        content: 'Животные'
                    },
                    {
                        elem: 'item',
                        url: '/feed/science/',
                        icon: 'science',
                        content: 'Наука'
                    },
                    {
                        elem: 'item',
                        url: '/feed/photos/',
                        icon: 'picture',
                        content: 'Фото и видео'
                    }
                ]
            }
    ]);

});

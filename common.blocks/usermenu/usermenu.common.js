BN.addDecl('usermenu').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
            {
                block: 'menu',
                mix: { block: 'usermenu', elem: 'menu' },
                content: [
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'spin',
                        content: 'Арт и дизайн'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'users',
                        content: 'Политика'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'wink',
                        content: 'Юмор'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'game',
                        content: 'Игры'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'vk',
                        content: 'Соц. сети'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'media',
                        content: 'Медиа'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'auto',
                        content: 'Авто и мото'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'trip',
                        content: 'Путешествия'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'movie',
                        content: 'Все о кино'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'tech',
                        content: 'Технологии'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'apple',
                        content: 'Apple'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'android',
                        content: 'Android'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'sport',
                        content: 'Спорт'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'animal',
                        content: 'Животные'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'science',
                        content: 'Наука'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        icon: 'picture',
                        content: 'Фото и видео'
                    }
                ]
            }
    ]);

});

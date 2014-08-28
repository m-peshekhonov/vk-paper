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
                        content: 'Политика'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Фото и видео'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Арт и дизайн'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Игры'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Медиа'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Авто и Мото'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Путешествия'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Все о кино'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Технологии'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Apple'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Спорт и здоровье'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Животные'
                    },
                    {
                        elem: 'item',
                        url: '#',
                        content: 'Наука'
                    }
                ]
            }
    ]);

});

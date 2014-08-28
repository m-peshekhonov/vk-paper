BN.addDecl('header').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
        {
            elem: 'inner',
            content: [
                {
                    elem: 'logo'
                },
                {
                    block: 'menu',
                    mix: { block: 'header', elem: 'menu' },
                    content: [
                        {
                            elem: 'item',
                            url: '#',
                            content: 'О проекте'
                        },
                        {
                            elem: 'item',
                            url: '#',
                            content: 'Настройки'
                        },
                        {
                            elem: 'item',
                            url: '#',
                            content: 'Выйти'
                        }
                    ]
                },
                {
                    block: 'input',
                    mix: { block: 'header', elem: 'search' },
                    value: 'Поиск'
                }
            ]
        }
    ]);

});

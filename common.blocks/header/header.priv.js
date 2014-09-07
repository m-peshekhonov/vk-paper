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
                    block: 'icon',
                    mix: { block: 'header', elem: 'search' },
                    mods: { type: 'search' },
                    content: {
                        block: 'input',
                        mix: { block: 'header', elem: 'input' },
                        value: 'Поиск'
                    }
                },
                {
                    block: 'menu',
                    mix: { block: 'header', elem: 'menu' },
                    content: [
                        {
                            elem: 'item',
                            url: '#',
                            content: 'Источники'
                        },
                        {
                            elem: 'item',
                            url: '#',
                            content: 'Настройки'
                        },
                        {
                            elem: 'item',
                            mix: { block: 'header', elem: 'exit' },
                            url: '#',
                            content: 'Выйти'
                        }
                    ]
                }
            ]
        }
    ]);

});

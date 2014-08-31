BEM.JSON.decl('b-page', {
    onBlock: function(ctx) {
        var pathPrefix = BN('i-page').getPathPrefix(),
            headStatic,
            footStatic;

        headStatic = [
            { elem: 'css', url: pathPrefix + '.css', ie: false }
        ];

        // Подключаем какие-то свои скрипты (например api карт)
        footStatic = [
            // { elem: 'js', url: '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU' },
            { elem: 'js', url: '//vk.com/js/api/openapi.js' },
            { block: 'i-jquery', elem: 'core' },
            { elem: 'js', url: pathPrefix + '.js' }
        ];

        ctx.param('x-ua-compatible', false);
        ctx.param('head', headStatic);

        ctx.content([
            ctx.content(),
            footStatic
        ], true);

        ctx.stop();
    }
});

BN.addDecl('b-page').blockTemplate(function(ctx) {
    ctx.js(true);

    ctx.content({
        elem: 'inner',
        content: [
            {
                block: 'header'
            },
            ctx.content()
        ]
    }, true);
});

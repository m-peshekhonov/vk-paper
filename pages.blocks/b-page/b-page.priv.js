BEM.JSON.decl('b-page', {
    onBlock: function(ctx) {
        var pathPrefix = BN('i-page').getPathPrefix(),
            headStatic,
            footStatic;

        headStatic = [
            { elem: 'css', url: pathPrefix + '.css', ie: false }
        ];

        footStatic = [
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

    var isLogin = BN('i-cookie').get('vkToken');

    ctx.mod('login', isLogin ? 'no' : 'yes');

    if(BN('i-router').getPath() === '/category') {
        ctx.mod('category', 'yes');
    }

    if (!isLogin && BN('i-router').getPath() != '/') {
        BN('i-router').replacePath('/');
    }

    // if(isLogin && BN('i-router').getPath() != '/feed') {
    //     BN('i-router').replacePath('/feed');

    //     return;
    // }

    ctx.content({
        elem: 'inner',
        content: [
            {
                block: 'header'
            },
            ctx.content(),
            {
                block: 'loader'
            },
            {
                block: 'scroll-top',
                js: true
            }
        ]
    }, true);
});

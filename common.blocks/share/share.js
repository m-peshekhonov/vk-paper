BN.addDecl('share').blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data;

    ctx.js(true);

    ctx.content([
        {
            elem: 'item',
            mods: { type: 'share' },
            icon: 'share',
            url: '/',
            count: data.reposts.count,
            content: 'Поделиться'
        },
        {
            elem: 'item',
            mods: { type: 'like' },
            icon: 'like',
            url: '/',
            count: data.likes.count,
            content: 'Мне нравится'
        }
    ]);

}).elemTemplate({

    'item': function(ctx) {
        var json = ctx.json();

        ctx
            .content({
                block: 'link',
                url: json.url,
                target: json.target,
                content: [
                    {
                        block: 'share',
                        elem: 'item-text',
                        content: ctx.content()
                    },
                    {
                        block: 'icon',
                        mix: { block: 'share', elem: 'icon' },
                        mods: { type: json.icon }
                    },
                    {
                        block: 'share',
                        elem: 'item-count',
                        content: json.count
                    }
                ]
            }, true);
    }

});

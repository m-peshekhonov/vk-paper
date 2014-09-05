BN.addDecl('share').blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data,
        reposts = data.reposts.count,
        likes = data.likes.count;

    ctx.js(true);

    ctx.content([
        {
            elem: 'item',
            mods: { type: 'share' },
            icon: 'share',
            url: '/',
            count: reposts !== 0 ? reposts : '',
            content: 'Поделиться'
        },
        {
            elem: 'item',
            mods: { type: 'like' },
            icon: 'like',
            url: '/',
            count: likes !== 0 ? likes : '',
            content: 'Мне нравится'
        }
    ]);

}).elemTemplate({

    item: function(ctx) {
        var json = ctx.json();

        ctx.content({
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
                json.count && {
                    block: 'share',
                    elem: 'item-count',
                    content: json.count
                }
            ]
        }, true);
    }

});

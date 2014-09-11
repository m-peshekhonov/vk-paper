BN.addDecl('main').blockTemplate(function(ctx) {
    var json = ctx.json();
        params = json.js.source;

    ctx.js(true);

    ctx.content([
            {
                elem: 'left',
                content: [
                    {
                        block: 'user',
                        js: true
                    },
                    {
                        block: 'usermenu'
                    }
                ]
            },
            {
                elem: 'center',
                content: {
                    block: 'feed',
                    js: { source: params }
                }
            },
            {
                elem: 'right',
                content: {
                    block: 'recommends',
                    js: true
                }
            }
    ]);

});

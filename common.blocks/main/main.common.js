BN.addDecl('main').blockTemplate(function(ctx) {
    var json = ctx.json();

    ctx.js(true);

    ctx.content([
            {
                elem: 'left',
                content: {
                    elem: 'left-inner',
                    content: [
                        {
                            block: 'user',
                            js: true
                        },
                        {
                            block: 'usermenu'
                        }
                    ]
                }
            },
            {
                elem: 'center',
                content: {
                    block: 'feed',
                    js: { source: json.js.source } // названия категорий (групп,страниц)
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

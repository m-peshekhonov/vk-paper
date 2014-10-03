BN.addDecl('main').blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data;

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
                content: data
            }
            // {
            //     elem: 'right',
            //     content: {
            //         block: 'recommends',
            //         js: true
            //     }
            // }
    ]);

});

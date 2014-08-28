BN.addDecl('main').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
            {
                elem: 'left',
                content: [
                    {
                        block: 'user'
                    },
                    {
                        block: 'usermenu'
                    }
                ]
            },
            {
                elem: 'center',
                content: 'center'
            },
            {
                elem: 'right',
                content: 'right'
            }
    ]);

});

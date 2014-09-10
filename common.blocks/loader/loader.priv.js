BN.addDecl('loader').blockTemplate(function(ctx) {

    ctx.content([
        {
            elem: 'spinner',
            content: [
                {
                    elem: 'item',
                    mods: { pos: 1 }
                },
                {
                    elem: 'item',
                    mods: { pos: 2 }
                },
                {
                    elem: 'item',
                    mods: { pos: 3 }
                }
            ]
        }
    ]);

});

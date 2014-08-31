BN.addDecl('user').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
            {
                block: 'image',
                mix: { block: 'user', elem: 'avatar' },
                src: 'https://pp.vk.me/c616729/v616729775/15093/3vUsMHi_AvI.jpg'
            },
            {
                elem: 'inner',
                content: [
                    {
                        elem: 'name',
                        content: 'Михаил Пешехонов'
                    },
                    {
                        block: 'link',
                        mix: { block: 'user', elem: 'settings' },
                        url: '#',
                        content: 'Настройки'
                    }
                ]
            }
    ]);

});

BN.addDecl('user').onSetMod({
    js: function() {
        this.loadInfo();
    }
}).elemTemplate({
    inner: function (ctx) {
        var json = ctx.json(),
            data = json.data;

        ctx.content([
            {
                block: 'image',
                mix: { block: 'user', elem: 'avatar' },
                src: data.photo_100
            },
            {
                elem: 'content',
                content: [
                    {
                        elem: 'name',
                        content: data.first_name + '&nbsp;' + data.last_name
                    },
                    {
                        block: 'link',
                        mix: { block: 'user', elem: 'settings' },
                        url: '/feed/',
                        content: 'Моя лента'
                    }
                ]
            }
        ]);
    }
}).instanceProp({
    loadInfo: function() {
        BN('api-vk').getUser().then(function(data) {
            var info = {
                    block: 'user',
                    elem: 'inner',
                    data: data[0]
                };
            BN('i-content').update(this.domElem, info);
        }.bind(this)).fail(function(err) {
            console.log('fail userinfo');
        }.bind(this));
    }
});

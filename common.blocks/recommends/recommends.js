BN.addDecl('recommends').onSetMod({
    js: function() {
        this.loadPortion();
    }
}).instanceProp({
    loadPortion: function() {

        BN('i-content').update(this.domElem, {
            block: 'recommends',
            elem: 'button'
        });

        BN('api-vk')._suggestionsGroups(10).then(function(data) {
            var data = data.filter(isNotProfile);

            function isNotProfile(item) {
                return item.type !== 'profile';
            }

            BN('i-content')['append'](this.domElem, data.map(function(item) {
                return {
                    block: 'recommends',
                    elem: 'item',
                    data: item
                }
            }));

        }.bind(this)).fail(function(err) {
            console.log('fail recommends');
        }.bind(this));

    }

}).elemTemplate({
    button: function (ctx) {
        return {
            block: 'button',
            mods: { theme: 'light', arrow: 'yes' },
            mix: { block: 'recommends', elem: 'button' },
            content: 'Другие рекомендации'
        }
    }
}).elemTemplate({

    item: function(ctx) {
        var json = ctx.json(),
            data = json.data,
            type = {
                'page': 'Страница',
                'group': 'Группа'
            };

        ctx
            .content({
                block: 'link',
                url: '#',
                mix: { block: 'recommends', elem: 'item-link' },
                content: [
                    {
                        block: 'image',
                        mix: { block: 'recommends', elem: 'avatar' },
                        src: data.photo_100
                    },
                    {
                        block: 'recommends',
                        elem: 'inner',
                        content: [
                            {
                                block: 'recommends',
                                elem: 'name',
                                content: data.name
                            },
                            {
                                elem: 'type',
                                content: type[data.type]
                            }
                        ]
                    }
                ]
            }, true);
    }

}).staticProp({
    live: function () {
        this.liveBindTo('button', 'click', function () {
            this.loadPortion();
        });

        return false;
    }
})

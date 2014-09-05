BN.addDecl('source-block').blockTemplate(function(ctx) {

    var json = ctx.json(),
        data = json.data,
        imageSrc;

    if(!data) return;

    imageSrc = data.image_src;

    ctx.content([
        {
            elem: 'inner',
            mods: { image: imageSrc ? 'yes' : 'no' },
            content: [
                imageSrc && {
                    block: 'image',
                    mix: { block: 'source-block', elem: 'image' },
                    target: '_blank',
                    url: data.url,
                    src: imageSrc
                },
                {
                    elem: 'content',
                    content: [
                        {
                            block: 'link',
                            url: data.url,
                            target: '_blank',
                            mix: { block: 'source-block', elem: 'title' },
                            content: data.title
                        },
                        {
                            block: 'link',
                            url: '//' + BN('i-global').getDomain(data.url),
                            target: '_blank',
                            mix: { block: 'source-block', elem: 'source' },
                            content: BN('i-global').getDomain(data.url)
                        },
                        {
                            elem: 'description',
                            content: BN('i-global').truncate(data.description, 180)
                        }
                    ]
                }
            ]
        }
    ]);
}).elemTemplate({

    picture: function (ctx) {
        var json = ctx.json();

        return {
            block: 'images',
            mix: { block: 'attach-post-link', elem: 'picture' },
            src: json.src,
            url: json.url,
            target: '_blank',
        }
    }

});


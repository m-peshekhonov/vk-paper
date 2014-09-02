BN.addDecl('box').onSetMod({
    js: function () {

        var _this = this,
            text = this.elem('text'),
            texthide = this.elem('text-hide'),
            imagesContainer = _this.elem('images-inner');

        this.bindTo(text, 'click', function () {
            this.delMod(texthide, 'hide');
            this.setMod(this.elem('show-more'), 'hide', 'yes');
        });

        BN('i-global').onImagesLoaded(imagesContainer, function () {
            BN('i-collage').init(imagesContainer);
        });

    }
}).blockTemplate(function (ctx) {

    var json = ctx.json(),
        data = json.data,
        text = BN('i-global').linkify(data.text),
        urlSrcVK = '//vk.com/' + data.screen_name,
        isLinkAttach = data.attachment && data.attachment.type === 'link';

    ctx.js(true);

    ctx.content([
        {
            block: 'image',
            mix: { block: 'box', elem: 'avatar' },
            url: urlSrcVK,
            target: '_blank',
            src: data.photo
        },
        {
            elem: 'inner',
            content: [
                {
                    block: 'link',
                    url: urlSrcVK,
                    target: '_blank',
                    mix: { block: 'box', elem: 'title' },
                    content: data.name || ''
                },
                {
                    elem: 'time',
                    content: BN('i-global').timeAgo(data.date)
                },
                {
                    elem: 'text',
                    content: [
                        {
                            elem: 'text-inner',
                            content: BN('i-global').cutText(text, 500)
                        },
                        text.length > 500 && {
                            elem: 'show-more',
                            content: 'Показать полностью..'
                        }
                    ]
                },
                isLinkAttach && {
                    block: 'attach-post-link',
                    data: data.attachment.link
                },
                {
                    elem: 'images',
                    data: data.attachments || ''
                },
                {
                    block: 'share',
                    mix: { block: 'box', elem: 'share' }
                }
            ]
        }
    ]);

}).elemTemplate({
    images: function (ctx) {
        var json = ctx.json(),
            data = json.data;

        if(!data) return;

        return {
            elem: 'images-inner',
            content: [
                data.map(function(item) {
                    return item.type === 'photo' && {
                        block: 'link',
                        mix: { block: 'box', elem: 'photo-wrapper' },
                        url: '#',
                        content: {
                            block: 'picture',
                            mix: { block: 'box', elem: 'post-image' },
                            src: item.photo.src_big || item.photo.src
                        }
                    };
                })
            ]
        }
    }
});


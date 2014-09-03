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
        attach = {},
        share = {
            likes: data.likes,
            reposts: data.reposts
        }
        docs = [];

        data.attachments.forEach(function(item){
            if(item.type == 'photo') {
                attach.isPhoto = true;
            }
            if(item.type == 'link') {
                attach.isLink = true;
                attach.link = item.link;
            }

            if(item.type == 'doc') {
                attach.isDoc = true;
                docs.push(item);
            }
        });

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
                attach.isPhoto && {
                    elem: 'images',
                    data: data.attachments
                },
                attach.isDoc && {
                    elem: 'docs',
                    data: docs
                },
                attach.isLink && {
                    block: 'source-block',
                    data: attach.link
                },
                {
                    block: 'share',
                    mix: { block: 'box', elem: 'share' },
                    data: share
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
    },

    docs: function (ctx) {
        var json = ctx.json(),
            data = json.data;

        console.log(data);

        if(!data) return;

        return {
            elem: 'docs-inner',
            content: [
                data.map(function(item) {
                    return item.type === 'doc' && {
                        block: 'link',
                        mix: { block: 'box', elem: 'doc-wrapper' },
                        target: '_blank',
                        url: item.doc.url,
                        content: [
                            {
                                block: 'picture',
                                mix: { block: 'box', elem: 'post-doc' },
                                src: item.doc.thumb || item.doc.thumb_s
                            },
                            {
                               block: 'box',
                               elem: 'post-doc-title',
                               content: item.doc.title
                            }
                        ]
                    };
                })
            ]
        }
    }
});


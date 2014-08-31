BN.addDecl('box').onSetMod({
    js: function() {

        var text = this.elem('text'),
            texthide = this.elem('text-hide');

        this.bindTo(text, 'click', function() {
            this.delMod(texthide, 'hide');
            this.setMod(this.elem('show-more'), 'hide', 'yes');
        });

    }
}).blockTemplate(function(ctx) {

    var json = ctx.json(),
        data = json.data;
        text = BN('i-global').linkify(data.text), // обрабатываем ссылки
        isLinkAttach = data.attachment && data.attachment.type === 'link';

    ctx.js(true);

    ctx.content([
        {
            block: 'image',
            mix: { block: 'box', elem: 'avatar' },
            src: data.photo
        },
        {
            elem: 'inner',
            content: [
                {
                    block: 'link',
                    url: '//vk.com/' + data.screen_name,
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
                            // Обрезаем текст, если больше 300 символов и обрабатываем ссылки
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

        console.log(data);

        if(!data) return;

        return [
            {
                elem: 'images-inner',
                content: [
                    data.map(function(item) {
                        var isPhoto = item.type === 'photo';

                        return  isPhoto && {
                            elem: 'post-image',
                            src: isPhoto ? (item.photo.src_big ||item.photo.src) : ''
                        };
                    })
                ]
            }
        ]

    },

    'post-image': function (ctx) {
        ctx.tag('img').attr('src', ctx.json().src);
    }

});


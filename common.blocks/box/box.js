BN.addDecl('box').onSetMod({
    js: function () {

        var _this = this,
            page = this.findBlockOutside('b-page'),
            text = this.elem('text'),
            texthide = this.elem('text-hide'),
            imagesContainer = _this.elem('images-inner'),
            albumsContainer = _this.elem('albums-photos');

        this.bindTo(text, 'click', function () {
            this.delMod(texthide, 'hide');
            this.setMod(this.elem('show-more'), 'hide', 'yes');
        });

        BN('i-global').onImagesLoaded(imagesContainer, function () {
            BN('i-collage').init(imagesContainer, 150);
        });

        BN('i-global').onImagesLoaded(albumsContainer, function () {
            BN('i-collage').init(albumsContainer, 100);
        });

        this.bindTo('source', 'click', function (e) {
            var id = String(this.elemParams(e.data.domElem).id).replace('-', '');

            BN('i-router').setPath('/feed/' + id);
        });

        this.bindTo('post-image', 'click', function (e) {
            e.preventDefault();

            var picSrc = e.target.src,
                params = {
                    src: picSrc,
                    width: this.elemParams(e.data.domElem).width,
                    height: this.elemParams(e.data.domElem).height
                };

            BN('i-content').append(page.domElem, [{
                block: 'popup',
                data: params
            }, { block: 'paranja' }]);

        });
    }
}).blockTemplate(function (ctx) {

    var json = ctx.json(),
        data = json.data,
        // Ищем ссылки и заменяем пустые строки на тэг
        text = BN('i-global').linkify(data.text).replace(/(?:\r\n|\r|\n)/g, '<br>'),
        attach = {},
        share = {
            likes: data.likes,
            reposts: data.reposts
        },
        docs = [],
        dataAttaches = data.attachments,
        postTime = BN('i-global').timeAgo(data.date);

        dataAttaches && dataAttaches.forEach(function(item){
            if(item.type == 'photo') {
                attach.isPhoto = true;
            }
            if(item.type == 'album') {
                attach.isAlbum = true;
            }
            if(item.type == 'link') {
                attach.isLink = true;
                attach.link = item.link;
            }
            if(item.type == 'doc') {
                attach.isDoc = true;
                docs.push(item);
            }
            if(item.type == 'video') {
                attach.isVideo = true;
            }

        });

    ctx.js(true);

    data.isFirst && ctx.mod('first', 'yes');

    ctx.content([
        {
            block: 'image',
            mix: [
                {
                    block: 'box',
                    elem: 'avatar',
                    js: { id: data.source_id }
                },
                {
                    block: 'box',
                    elem: 'source'
                }
            ],
            target: '_blank',
            src: data.photo
        },
        {
            elem: 'inner',
            content: [
                {
                    block: 'link',
                    mix: [
                        {
                            block: 'box',
                            elem: 'title',
                            js: { id: data.source_id }
                        },
                        {
                            block: 'box',
                            elem: 'source'
                        }
                    ],
                    content: data.name || ''
                },
                {
                    elem: 'time',
                    content: postTime ? postTime + ' назад' : 'только что'
                },
                {
                    elem: 'text',
                    content: [
                        {
                            elem: 'text-inner',
                            content: BN('i-global').hashtags(text, data.source_id)
                        }
                    ]
                },
                (attach.isVideo || attach.isPhoto) && {
                    elem: 'images',
                    data: data.attachments
                },
                attach.isAlbum && {
                    elem: 'album',
                    data: data.attachments
                },
                attach.isDoc && {
                    elem: 'docs',
                    data: docs
                },
                attach.isLink && {
                    block: 'source-block',
                    data: attach.link
                }
                // {
                //     block: 'share',
                //     mix: { block: 'box', elem: 'share' },
                //     data: share,
                //     js: { source_id: data.source_id, post_id: data.post_id }
                // }
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
                    var isPhoto = item.type === 'photo',
                        isVideo = item.type === 'video';

                    return (isPhoto || isVideo) && {
                        block: 'link',
                        mix: { block: 'box', elem: 'photo-wrapper', mods: { type: isPhoto ? 'photo' : 'video' } },
                        url: isPhoto && (item.photo.photo_807 || item.photo.photo_604) || '#',
                        content: item.type === 'photo' ? {
                            block: 'picture',
                            mix: {
                                block: 'box',
                                elem: 'post-image',
                                js: { width: item.photo.width, height: item.photo.height }
                            },
                            src: item.photo.photo_1280 || item.photo.photo_807 || item.photo.photo_604
                        } : [{
                                block: 'picture',
                                mix: { block: 'box', elem: 'post-image'},
                                src: item.video.photo_640 || item.video.photo_320
                            },
                            {
                                block: 'box',
                                elem: 'video-control'
                            }
                        ]
                    };
                })
            ]
        }
    },

    album: function (ctx) {
        var json = ctx.json(),
            data = json.data,
            album = data[0].album;

        return BN('api-vk').getPhotos(album.owner_id, album.id, 15).then(function(data) {
            return {
                elem: 'albums-inner',
                content: [
                    {
                        elem: 'albums-photos',
                        content: [
                            data.items.map(function(item) {
                                return {
                                    block: 'link',
                                    mix: { block: 'box', elem: 'album-wrapper' },
                                    url: '#',
                                    content: {
                                        block: 'picture',
                                        mix: { block: 'box', elem: 'post-album' },
                                        src: item.photo_604 || item.photo_130
                                    }
                                };
                            })
                        ]
                    },
                    {
                        elem: 'album-description',
                        content: [
                            {
                                elem: 'album-title',
                                content: album.title
                            },
                            {
                                elem: 'count-photos',
                                content: album.size + ' фото'
                            }
                        ]
                    }
                ]
            }
        });

    },

    docs: function (ctx) {
        var json = ctx.json(),
            data = json.data;

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
                                src: item.doc.photo_130 || item.doc.photo_100
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


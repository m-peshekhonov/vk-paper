BN.addDecl('box').onSetMod({
    js: function () {

        var _this = this,
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
    }
}).blockTemplate(function (ctx) {

    var json = ctx.json(),
        data = json.data,
        // Ищем ссылки и заменяем пустые строки на тэг
        text = BN('i-global').linkify(data.text).replace(/(?:\r\n|\r|\n)/g, '<br>'),
        urlSrcVK = '//vk.com/' + data.screen_name,
        attach = {},
        share = {
            likes: data.likes,
            reposts: data.reposts
        },
        docs = [],
        dataAttaches = data.attachments,
        postTime = BN('i-global').timeAgo(data.date),
        dataRepost = data.copy_history;

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
                    content: postTime ? postTime + ' назад' : 'только что'
                },
                dataRepost && {
                    elem: 'repost',
                    data: dataRepost[0]
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
                },
                {
                    block: 'share',
                    mix: { block: 'box', elem: 'share' },
                    data: share,
                    js: { source_id: data.source_id, post_id: data.post_id }
                }
            ]
        }
    ]);

}).elemTemplate({

    repost: function (ctx) {
        var json = ctx.json(),
            data = json.data,
            gId = String(data.from_id).replace('-', ''),
            text = BN('i-global').linkify(data.text).replace(/(?:\r\n|\r|\n)/g, '<br>'),
            attach = {},
            dataAttaches = data.attachments,
            docs = [];

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

        return BN('api-vk')._groupInfo(gId).then(function(res) {
            var res = res[0],
                link = '//vk.com/' + res.screen_name;

            return [
                {
                    elem: 'repost-inner',
                    content: [
                        {
                            block: 'image',
                            mix: { block: 'box', elem: 'repost-avatar' },
                            url: link,
                            target: '_blank',
                            src: res.photo_50
                        },
                        {
                            elem: 'repost-content',
                            content: [
                                {
                                    block: 'icon',
                                    mix: { block: 'box', elem: 'repost-icon' },
                                    mods: { type: 'share' }
                                },
                                {
                                    block: 'link',
                                    url: link,
                                    target: '_blank',
                                    mix: { block: 'box', elem: 'repost-title' },
                                    content: res.name
                                },
                                {
                                    block: 'link',
                                    url: link,
                                    target: '_blank',
                                    mix: { block: 'box', elem: 'repost-time' },
                                    content: BN('i-global').timeAgo(data.date) + ' назад'
                                }
                            ]
                        }
                    ]
                },
                {
                    elem: 'text',
                    content: BN('i-global').hashtags(text, data.source_id)
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
            ]
        });

    },

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
                        url: '#',
                        content: item.type === 'photo' ? {
                            block: 'picture',
                            mix: { block: 'box', elem: 'post-image' },
                            src: item.photo.photo_807 || item.photo.photo_604
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


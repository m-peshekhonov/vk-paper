BN.addDecl('share').onSetMod({
    'js': function() {
        this.source_id = this.params.source_id;
        this.post_id = this.params.post_id;
    }
}).blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data,
        reposts = data.reposts.count,
        likes = data.likes.count;

    ctx.js(true);

    ctx.content([
        {
            elem: 'item',
            mods: { type: 'share' },
            mix: { block: 'share', elem: 'share' },
            icon: 'share',
            url: '/',
            count: reposts !== 0 ? reposts : '',
            content: 'Поделиться'
        },
        {
            elem: 'item',
            mods: { type: 'like' },
            mix: { block: 'share', elem: 'like' },
            icon: 'like',
            url: '/',
            count: likes !== 0 ? likes : '',
            content: 'Мне нравится'
        }
    ]);

}).elemTemplate({

    item: function(ctx) {
        var json = ctx.json();

        ctx.content({
            block: 'link',
            url: json.url,
            target: json.target,
            content: [
                {
                    block: 'share',
                    elem: 'item-text',
                    content: ctx.content()
                },
                {
                    block: 'icon',
                    mix: { block: 'share', elem: 'icon' },
                    mods: { type: json.icon }
                },
                json.count && {
                    block: 'share',
                    elem: 'item-count',
                    content: json.count
                }
            ]
        }, true);
    }

}).instanceProp({
    _likeUnlike: function() {
        var action = '_like';

        // if (this._like.hasMod('liked', 'yes')) {
        //     action = 'unLikePic';
        //     this._like.delMod('liked');
        //     this.delMod(this.elem('likeicon'), 'liked');
        //     cnt--;
        // } else {
        //     action = 'likePic';
        //     this._like.setMod('liked', 'yes');
        //     this.setMod(this.elem('likeicon'), 'liked', 'yes');
        //     cnt++;
        // }
        // console.log('sdsds');
        BN('api-vk')[action](this.source_id, this.post_id);
        // BN('i-content').update(this.elem('like-count'), cnt);
    }
}).staticProp({
    live:  function() {
        this.liveBindTo('like', 'click', function(e) {
            this._likeUnlike();
        });

        return false;
    }
});

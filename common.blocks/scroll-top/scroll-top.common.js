BN.addDecl('scroll-top').onSetMod({
    'js': function() {
        var OFFSET_TOP = 700,
            page = this.findBlockOutside('b-page'),
            scrollBlock = this;

        $(window).on('scroll', $.throttle(scroll_show, 200));

        this.bindTo('mousedown', function () {
            page.domElem.scrollTop(0);
        });

        function scroll_show () {
            var top = $(this).scrollTop();

            if(top > OFFSET_TOP) {
                scrollBlock.setMod('show', 'yes');
            } else if (scrollBlock.hasMod('show', 'yes') && top < OFFSET_TOP) {
                scrollBlock.delMod('show');
            }
        }
    }
}).blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data;

        ctx.content({
            elem: 'text',
            content: 'Наверх'
        });
});

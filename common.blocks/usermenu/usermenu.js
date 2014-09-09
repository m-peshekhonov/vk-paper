BN.addDecl('usermenu').onSetMod({
    js: function() {
        var OFFSET_TOP = 65,
            page = this.findBlockOutside('b-page'),
            menu = this;

        $(window).on('scroll', $.throttle(menu_fixed, 20))

        function menu_fixed () {
            var top = $(this).scrollTop();

            if(top > OFFSET_TOP) {
                menu.setMod('fixed', 'yes');
            } else if (menu.hasMod('fixed', 'yes') && top < OFFSET_TOP) {
                menu.delMod('fixed');
            }
        }
    }
});

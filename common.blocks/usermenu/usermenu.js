BN.addDecl('usermenu').onSetMod({
    js: function() {
        var OFFSET_TOP = 65,
            _this = this,
            page = this.findBlockOutside('b-page');

        this.feed = page.findBlockInside('feed');

        // $(window).on('scroll', $.throttle(menu_fixed, 20))

        function menu_fixed () {
            var top = $(this).scrollTop();

            if(top > OFFSET_TOP) {
                _this.setMod('fixed', 'yes');
            }
             else if (_this.hasMod('fixed', 'yes') && top < OFFSET_TOP) {
                _this.delMod('fixed');
            }
        }

        // this.bindTo('item', 'click', function (e) {
        //     var source = this.elemParams(e.data.domElem).source;

        //     _this.getStringSorce(source);
        // });
    }
});
// .instanceProp({
//     getStringSorce: function (source) {
//         var firstElem = String(source[0]);
//             firstElemMass = firstElem.replace(firstElem[0], 'g' + firstElem[0]);

//         source = source.slice(1);
//         source.unshift(firstElemMass);
//         source = source.join(', g');

//         this.updateFeed(source)
//     },

//     updateFeed: function(source) {
//         this.feed.loadPortion(true, source);
//     }
// });

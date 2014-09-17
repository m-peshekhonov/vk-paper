BN.addDecl('header').onSetMod({
    js: function() {
        this._page = this.findBlockOutside('b-page');
    }
}).instanceProp({
    _updatePage: function() {
        this._page.findBlockInside('feed').firstLoad(true);

        this._page.domElem.scrollTop(0);
    }
}).staticProp({
    live: function () {
        this.liveBindTo('logo', 'click', function() {
            if(this._page.hasMod('feed', 'yes')) {
                this._updatePage();
            }
        });

        this.liveBindTo('exit', 'click', function(e) {
            e.preventDefault();

            BN('i-vk').logout();

            return false;
        });

        return false;
    }
})

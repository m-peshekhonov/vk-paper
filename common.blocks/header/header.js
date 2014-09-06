BN.addDecl('header').onSetMod({
    'js': function() {
        var _this = this;

        this._page = this.findBlockOutside('b-page');

        this.bindTo('logo', 'click', function() {
            this._updatePage();
        }.bind(this));

    }
}).instanceProp({
    _updatePage: function() {
        this._page.findBlockInside('feed').firstLoad();

        this._page.domElem.scrollTop(0);
    }
});

BN.addDecl('login').onSetMod({
    js: function() {
        this.page = this.findBlockOutside('b-page');
    }
}).staticProp({
    live:  function () {
        this.liveBindTo('enter', 'click', function() {
            this.page.domElem.scrollTop(0);
            BN('i-vk').login();
        });

        return false;
    }
});

BN.addDecl('login').onSetMod({
    js: function() {
        // console.log('init');
    }
}).staticProp({
    live:  function () {
        this.liveBindTo('enter', 'click', function() {
            BN('i-vk').login();
        });

        return false;
    }
});

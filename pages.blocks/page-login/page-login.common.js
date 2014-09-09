BN.addDecl('page-login', 'page', {
    route: /^\/$/
}).staticProp({
    init: function () {
        return this.out({
            block: 'login'
        });
    }
});

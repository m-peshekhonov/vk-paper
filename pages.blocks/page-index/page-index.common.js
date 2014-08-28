BN.addDecl('page-index', 'page', {
    route: /^\/$/
}).staticProp({
    init: function () {
        return this.out({
            block: 'main'
        });
    }
});

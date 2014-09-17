BN.addDecl('page-cat', 'page', {
    route: /^\/(category)\/?$/
}).staticProp({
    init: function () {
        return this.out({
            block: 'category'
        });
    }
});

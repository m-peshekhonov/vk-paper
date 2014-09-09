BN.addDecl('page-feed', 'page', {
    route: /^\/(feed)?$/
}).staticProp({
    init: function () {
        return this.out({
            block: 'main'
        });
    }
});

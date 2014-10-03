BN.addDecl('page-search', 'page', {
    route: /^\/search\/?(.*)$/
}).staticProp({
    init: function (matchers) {

        var cat = matchers[1],
            text = cat ? cat.replace(/\/$/, '') : 'user';

        console.log(text);

        return this.out({
            block: 'feed',
            js: { query: text }
        });

    }
});

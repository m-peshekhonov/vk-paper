BN.addDecl('page-feed', 'page', {
    route: /^\/(feed)?\/?(.+)\/?$/
}).staticProp({
    init: function (matchers) {

        var feed = matchers[1],
            cat = matchers[2],
            hash = cat !== '/' ? cat.replace(/\/$/, '') : 'user';

        if(!feed) hash = 'user';

        return this.out({
            block: 'feed',
            js: { source: hash }
        });
    }
});

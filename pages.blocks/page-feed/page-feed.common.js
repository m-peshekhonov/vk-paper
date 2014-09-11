BN.addDecl('page-feed', 'page', {
    route: /^\/(feed)?\/?(.+)\/?$/
}).staticProp({
    init: function (matchers) {

        var feed = matchers[1],
            cat = matchers[2],
            hash = cat !== '/' ? cat.replace(/\/$/, '') : 'default',
            source = {
                'design': ['g4384363', 'g34580489', 'g36048400', 'g36045680'],
                'polytics': ['g20035339', 'g15548215', 'g15755094', 'g49388814'],
                'default' : ['g20035339']
            };

        if(!feed) hash = 'default';

        return this.out({
            block: 'main',
            js: { source: source[hash] }
        });
    }
});

BN.addDecl('image').blockTemplate(function(ctx) {
    var json = ctx.json();

    ctx.attr('style ', 'background-image: url(' +  json.src + ')');

    if (json.url) {
        ctx
            .tag('a')
            .attr('href', json.url)
            .attr('target', json.target);
    }
});

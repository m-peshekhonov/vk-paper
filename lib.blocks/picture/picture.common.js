BN.addDecl('picture').blockTemplate(function(ctx) {
    ctx.tag('img')
        .attr('src', ctx.json().src);
});

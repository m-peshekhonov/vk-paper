BN.addDecl('input').blockTemplate(function(ctx) {
    ctx.tag('input')
        .attr('value', ctx.json().value);
});

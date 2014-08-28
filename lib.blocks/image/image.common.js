BN.addDecl('image').blockTemplate(function(ctx) {
    ctx.attr('style ', 'background-image: url(' +  ctx.json().src + ')');
});

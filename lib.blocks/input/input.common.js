BN.addDecl('input').onSetMod({
    js: function () {
        var _this = this;

        this.input = this.domElem;
        this.val = this.input.val();

        this.input.on('focus', function () {
            _this.focused();
        });

        this.input.on('blur', function () {
            _this.blur();
        });

    }
}).blockTemplate(function(ctx) {
    ctx.js(true);

    ctx.tag('input')
        .attr('value', ctx.json().value);
}).instanceProp({
    focused: function () {
        this.setMod('focused', 'yes');
        this.newValue = this.input.val();

        if (this.val === this.newValue) {
            this.input.val('');
        }
    },
    blur: function () {
        this.delMod('focused');

        if (!this.input.val()) {
            this.input.val(this.val)
        }
    }
});

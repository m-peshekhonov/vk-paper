BN.addDecl('popup').onSetMod({
    js: function() {
        var _this = this;
            picParams = this.elemParams(this.elem('inner')).picParams;

        this._page = this.findBlockOutside('b-page');
        this._paranja = this._page.findBlockInside('paranja');

        this._picsArray = this._page.findBlockInside('feed').picsArray;
        this._currentPicId = picParams.id;

        this._picsArray.forEach(function(item, pos) {
            if (item.id == _this._currentPicId) {
                _this._currentPicPos = pos;

                return;
            }
        });

        this.setMod('show', 'yes');
        this._page.setMod('overflow', 'yes');

        this.resizeImage(picParams);

        this.bindToDoc('keyup', function(e) {
            e.which === 27 && this._destroy();
            BEM.DOM.doc.unbind('keyup');
        }.bind(this));

    }
}).staticProp({
    live: function () {
        this.liveBindTo('image', 'click', function () {
            this.nextPic();
        });

        this.liveBindTo('close', 'click', function () {
            this._destroy();
        });

        return false;
    }
}).instanceProp({
    nextPic: function () {
        var nextPos = this._currentPicPos + 1,
            nextPic = this._picsArray[nextPos];

        if(!nextPic) {
            this._destroy();

            return;
        }

        this._currentPicPos++;

        this._showNextPic(nextPic);
    },

    _showNextPic: function (picture) {
        BN('i-content').update(this.domElem, [
            {
                block: 'popup',
                elem: 'close'
            },
            {
                block: 'popup',
                elem: 'inner',
                data: picture
            }
        ]).always(function() {
            this.resizeImage(picture);
        }.bind(this));

    },

    resizeImage: function (picParams) {
        var pw = picParams.width,
            ph = picParams.height;
            ww = $(window).width(),
            wh = $(window).height(),
            newPW = Number,
            newPH = Number,
            paddings = 150, // Отступы у фотки (px)
            paddingsInner = 40, // Отступы для контейнера (px)
            picMaxHeightPaddings = 100; // Отступы для фоток, у которых ширина чуть больше высоты

        if (pw/ph < 2) {
            if ((ph + picMaxHeightPaddings) > wh) {
                newPH = wh - paddings;
                newPW = pw / (ph / (wh - paddings));
            } else {
                newPW = pw
                newPH = ph;
            }
        } else {
            if (pw > ww) {
                newPW = ww - paddings;
                newPH = ph / (pw / (ww - paddings));
            } else {
                newPW = pw;
                newPH = ph;
            }
        }

        newPH = Math.round(newPH);
        newPW = Math.round(newPW);

        this.findElem('image').css({
            height: newPH,
            width: newPW
        });

        this.findElem('inner').css({
            height: newPH + paddingsInner,
            width: newPW + paddingsInner,
            'marginTop': (wh - (newPH + paddingsInner)) / 2
        });
    },

    _destroy: function () {
        this.destruct();
        this._paranja.destruct();
        this._page.delMod('overflow');
    }
}).blockTemplate(function(ctx) {
    var data = ctx.json().data;

    ctx.js(true);

    ctx.content([
        {
            elem: 'close'
        },
        {
            elem: 'inner',
            data: data
        }
    ]);

}).elemTemplate({
    'inner': function (ctx) {
        var data = ctx.json().data;
        ctx.js({ picParams: data });

        ctx.content([
            {
                elem: 'content',
                content: {
                    elem: 'photo',
                    content: {
                        block: 'picture',
                        mix: { block: 'popup', elem: 'image' },
                        src: data.src || data.photo_1280 || data.photo_807 || data.photo_604
                    }
                }
            }
        ])
    }
});

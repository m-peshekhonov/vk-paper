BN.addDecl('i-collage').staticProp({

    init: function (block) {

        var _this = this,
            row = 0,
            elements = [],
            rownum = 1,
            $this = block,
            settings = {
                targetHeight : 150,
                fadeSpeed : 'fast',
                allowPartialLastRow : false,
                albumWidth: block.width(),
                padding: parseFloat(block.css('padding-left')),
                images: block.children()
            };

        settings.images.each(function(i) {

            var $this = $(this),
                $img  = ($this.is('img')) ? $this : $(this).find('img'),
                w = (typeof $img.data('width') != 'undefined') ? $img.data('width') : $img.width(),
                h = (typeof $img.data('height') != 'undefined') ? $img.data('height') : $img.height(),
                imgParams =  _this.getImgProperty($img),
                nw = Math.ceil(w/h*settings.targetHeight),
                nh = Math.ceil(settings.targetHeight);
            $img.data('width', w);
            $img.data('height', h);

            elements.push([this, nw, nh, imgParams['w'], imgParams['h']]);

            row += nw + imgParams['w'] + settings.padding;

            if( row > settings.albumWidth && elements.length != 0 ){
                _this.resizeRow(elements, (row - settings.padding), settings, rownum);

                delete row;
                delete elements;

                row         = 0;
                elements    = [];
                rownum      += 1;
            }

            if ( settings.images.length-1 == i && elements.length != 0){
                _this.resizeRow(elements, row, settings, rownum);

                delete row;
                delete elements;
                row         = 0;
                elements    = [];
                rownum      += 1;
            }
        });

    },

    resizeRow: function (obj, row, settings, rownum) {
        var imageExtras         = (settings.padding * (obj.length - 1)) + (obj.length * obj[0][3]),
            albumWidthAdjusted  = settings.albumWidth - imageExtras,
            overPercent         = albumWidthAdjusted / (row - imageExtras),
            trackWidth          = imageExtras,
            lastRow             = (row < settings.albumWidth  ? true : false);

        for (var i = 0; i < obj.length; i++) {

            var $obj        = $(obj[i][0]),
                fw          = Math.floor(obj[i][1] * overPercent),
                fh          = Math.floor(obj[i][2] * overPercent),
                isNotLast   = !!(( i < obj.length - 1 ));

            trackWidth += fw;

            if(!isNotLast && trackWidth < settings.albumWidth){
                fw = fw + (settings.albumWidth - trackWidth);
            }

            fw--;

            var $img = ( $obj.is('img') ) ? $obj : $obj.find('img');

            $img.width(fw);
            if( !$obj.is('img') ){
                $obj.width(fw + obj[i][3]);
            }

            $img.height(fh);
            if( !$obj.is('img') ){
                $obj.height(fh + obj[i][4]);
            }

            $img
                .one('load', function (target) {
                return function(){
                    target.children().fadeIn(600);
                }
                }($obj))
                .each(function() {
                    if(this.complete) $(this).trigger('load');
                });

        }
    },

    getImgProperty: function (img) {
        $img = $(img);
        var params =  new Array();
        params['w'] = (parseFloat($img.css('border-left-width')) + parseFloat($img.css('border-right-width')));
        params['h'] = (parseFloat($img.css('border-top-width')) + parseFloat($img.css('border-bottom-width')));

        return params;
    }

}).done();

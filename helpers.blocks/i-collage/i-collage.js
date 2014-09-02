BN.addDecl('i-collage').staticProp({

    init: function (blocks, options) {

        var _this = BN('i-collage'),
            collage = {};

        collage.defaults = {
            'targetHeight'          : 400,
            'fadeSpeed'             : "fast",
            'display'               : "inline-block",
            'effect'                : 'default',
            'direction'             : 'vertical',
            'allowPartialLastRow'   : false
        };

        return blocks.each(function () {

            var row         = 0,
                elements    = [],
                rownum = 1,
                $this = $(this);

            collage.defaults.albumWidth    = $this.width();
            collage.defaults.padding       = parseFloat( $this.css('padding-left') );
            collage.defaults.images        = $this.children();

            var settings = $.extend({}, collage.defaults, options);

            settings.images.each(
                function(index){


                    var $this = $(this),
                        $img  = ($this.is("img")) ? $this : $(this).find("img"),
                        w = (typeof $img.data("width") != 'undefined') ? $img.data("width") : $img.width(),
                        h = (typeof $img.data("height") != 'undefined') ? $img.data("height") : $img.height(),
                        imgParams =  _this.getImgProperty($img),
                        nw = Math.ceil(w/h*settings.targetHeight),
                        nh = Math.ceil(settings.targetHeight);

                    $img.data("width", w);
                    $img.data("height", h);


                    elements.push([this, nw, nh, imgParams['w'], imgParams['h']]);

                    row += nw + imgParams['w'] + settings.padding;

                    if( row > settings.albumWidth && elements.length != 0 ){
                        _this.resizeRow(elements, (row - settings.padding), settings, rownum, _this);

                        delete row;
                        delete elements;

                        row         = 0;
                        elements    = [];
                        rownum      += 1;
                    }

                    if ( settings.images.length-1 == index && elements.length != 0){
                        _this.resizeRow(elements, row, settings, rownum, _this);

                        delete row;
                        delete elements;
                        row         = 0;
                        elements    = [];
                        rownum      += 1;
                    }
                }
            );

        });

    },

    resizeRow: function (obj, row, settings, rownum, _this) {
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

            if(settings.allowPartialLastRow === true && lastRow === true){
               fw = obj[i][1];
               fh = obj[i][2];
            }

            trackWidth += fw;

            if(!isNotLast && trackWidth < settings.albumWidth){
                if(settings.allowPartialLastRow === true && lastRow === true){
                    fw = fw;
                }else{
                    fw = fw + (settings.albumWidth - trackWidth);
                }
            }

            fw--;

            var $img = ( $obj.is("img") ) ? $obj : $obj.find("img");

            $img.width(fw);
            if( !$obj.is("img") ){
                $obj.width(fw + obj[i][3]);
            }

            $img.height(fh);
            if( !$obj.is("img") ){
                $obj.height(fh + obj[i][4]);
            }

            _this.applyModifications($obj, isNotLast, settings);

            $img
                .one('load', function (target) {
                return function(){
                    if( settings.effect == 'default'){
                        target.animate({opacity: '1'},{duration: settings.fadeSpeed});
                    } else {
                        if(settings.direction == 'vertical'){
                            var sequence = (rownum <= 10  ? rownum : 10);
                        } else {
                            var sequence = (i <= 9  ? i+1 : 10);
                        }
                        target.removeClass(function (index, css) {
                            return (css.match(/\beffect-\S+/g) || []).join(' ');
                        });
                        target.addClass(settings.effect);
                        target.addClass("effect-duration-" + sequence);
                    }
                }
                }($obj))

                .each(function() {
                        if(this.complete) $(this).trigger('load');
                });

        }
    },

    applyModifications: function ($obj, isNotLast, settings) {
        var css = {
                'margin-bottom'     : settings.padding + "px",
                'margin-right'      : (isNotLast) ? settings.padding + "px" : "0px",
                'display'           : settings.display,
                'vertical-align'    : "bottom",
                'overflow'          : "hidden"
            };

        return $obj.css(css);
    },

    getImgProperty: function (img) {
        $img = $(img);
        var params =  new Array();
        params["w"] = (parseFloat($img.css("border-left-width")) + parseFloat($img.css("border-right-width")));
        params["h"] = (parseFloat($img.css("border-top-width")) + parseFloat($img.css("border-bottom-width")));

        return params;
    }

}).done();

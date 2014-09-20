BN.addDecl('i-global').staticProp({

    page: '',

    timeAgo: function(time) {
        var round = Math.round,
            date = Math.abs(time * 1000),
            seconds = round((new Date - date) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            weeks = round(days / 7),
            month = round(days / 30),
            years = round(days / 365),
            timeAgo;

        function getTime() {
            if (years > 1) {
                return years + ' г.';
            }
            if (month > 1) {
                return month + ' мес.';
            }
            if (weeks > 1) {
                return weeks + ' нед.';
            }
            if (days > 1) {
                return days + ' д.';
            }
            if (hours > 1) {
                return hours + ' ч.';
            }
            if (minutes > 1) {
                return minutes + ' мин.';
            }
            if (seconds > 1) {
                return seconds + ' сек.';
            }
        };

        return getTime();
    },

    declination: function(a, b, c, s) {
        var words = [a, b, c]
            index = s % 100;

        if (index >= 11 && index <= 14) { index = 0; }
        else {
            index = (index %= 10) < 5 ? (index > 2 ? 2 : index) : 0;
        }

        return(words[index]);
    },

    linkify: function(text) {
        var urlRegex =/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
        return text.replace(urlRegex, function(url) {
            var link = url.slice(0,4) !== 'http' ? ('//' + url) : url;

            return '<a class="link" href="' + link + '" target="_blank">' + BN('i-global').truncate(url, 70) + '</a>';
        });
    },

    hashtags: function (text, id) {
        var pattern = /(#[a-zа-я0-9][a-zа-я0-9(@._)]*)/ig,
            isWall = false,
            wallQ;

        return text.replace(pattern, function(url) {
            for(var i = 0; i < text.length; i++) {
               if(text[i] === '@') isWall = true;
            }

            url.replace(/(#[a-zа-я0-9][a-zа-я0-9]*)/ig, function(link) {
                wallQ = link.replace('#', '');
            });

            var newUrl = isWall ? '//vk.com/wall'+ id +'?q=%23' + wallQ : '//vk.com/feed?q='+url.replace('#', '')+'&section=search';

            return '<a target="_blank" class="link" href="'+ newUrl +'">' + url + '</a>';
        });
    },

    cutText: function(text, length) {

        function lastWord(str) {
            return str.split(/[\s\!,\.\?]+/g).pop();
        }

        if(text.length > length) {
            var firstText = text.slice(0, length),
                lastWord = lastWord(firstText),
                secondText = text.slice(length, text.length),
                allText = firstText + '<div class="box__text-hide box__text-hide_hide_yes">' + secondText + '</div>';

            return allText;
        } else {
            return text;
        }
    },

    onImagesLoaded: function(container, callback) {
        var images = container.find('img').length;

        if(!images) callback();

        $('img', container).each(function () {
            $(this).one('load error', function () {
                images--;
                images == 0 && callback();
            });

            this.complete && $(this).load();
         });
    },

    truncate: function(str, maxlength) {
        if (str.length > maxlength) {
            return str.slice(0, maxlength - 3) + '...';
        }

        return str;
    },

    getDomain: function(str) {
        var match = str.match(/(?:https?:\/\/)?(?:www\.)?(.*?)\//);

        return match[match.length-1];
    }


});

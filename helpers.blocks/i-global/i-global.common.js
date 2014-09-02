/*

    BN('i-global').timeAgo('1327611110417', true) -  выводит время в красивом формате.
    Второй параметр - слово "Назад".
    Результат строка: '43 мин. назад' или '43 мин'.

    BN('i-global').declination('Фотографий', 'Фотография', 'Фотографии', 15) - склоняет слова.
    Последним параметром число, относительно которого нужно склонять.
    Результат строка: 'Фотографий'
 */

BN.addDecl('i-global').staticProp({

    page: '',

    timeAgo: function(time, short) {
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

        return getTime() + (short ? '' : ' назад');
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
        var pattern = /([-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/?[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)/gi;

        return text.replace(pattern, '<a class="link" href="$1" target="_blank">$1</a>');
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

            // console.log(firstText.replace(lastWord, '...'));

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
    }

});

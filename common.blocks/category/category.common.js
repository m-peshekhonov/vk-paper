BN.addDecl('category').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
        {
            elem: 'title',
            content: 'Выберите несколько категорий'
        },
        {
            elem: 'inner',
            content: [
                {
                    elem: 'item',
                    mods: { type: 'design' },
                    title: 'Арт и Дизайн'
                },
                {
                    elem: 'item',
                    mods: { type: 'polytics' },
                    title: 'Политика'
                },
                {
                    elem: 'item',
                    mods: { type: 'humor' },
                    title: 'Юмор'
                },
                {
                    elem: 'item',
                    mods: { type: 'games' },
                    title: 'Игры'
                },
                {
                    elem: 'item',
                    mods: { type: 'social' },
                    title: 'Соц. сети'
                },
                {
                    elem: 'item',
                    mods: { type: 'media' },
                    title: 'Медиа'
                },
                {
                    elem: 'item',
                    mods: { type: 'auto' },
                    title: 'Авто и мото'
                },
                {
                    elem: 'item',
                    mods: { type: 'travel' },
                    title: 'Путешествия'
                },
                {
                    elem: 'item',
                    mods: { type: 'movies' },
                    title: 'Всё о кино'
                },
                {
                    elem: 'item',
                    mods: { type: 'technology' },
                    title: 'Технологии'
                },
                {
                    elem: 'item',
                    mods: { type: 'apple' },
                    title: 'Apple'
                },
                {
                    elem: 'item',
                    mods: { type: 'android' },
                    title: 'Android'
                },
                {
                    elem: 'item',
                    mods: { type: 'sport' },
                    title: 'Спорт'
                },
                {
                    elem: 'item',
                    mods: { type: 'animals' },
                    title: 'Животные'
                },
                {
                    elem: 'item',
                    mods: { type: 'science' },
                    title: 'Наука'
                },
                {
                    elem: 'item',
                    mods: { type: 'photos' },
                    title: 'Фото и Видео'
                }
            ]
        },
        {
            elem: 'button',
            content: 'Начать читать'
        }
    ]);

}).elemTemplate({

    'item': function(ctx) {
        var json = ctx.json();

        ctx.content({
            elem: 'item-title',
            content: json.title
        }, true);
}

});

BN.addDecl('login').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
        {
            elem: 'inner',
            content: [
                {
                    elem: 'about',
                    content: [
                        {
                            elem: 'description',
                            content: [
                                {
                                    elem: 'about-title',
                                    content: 'Что такое VK Paper ?'
                                },
                                {
                                    elem: 'about-text',
                                    content: 'Цель проекта — показать самые интересные и важные новости лучших сообществ ВКонтакте в удобном и красивом формате!'
                                }
                            ]
                        },
                        {
                            elem: 'button',
                            mix: { block: 'login', elem: 'enter' },
                            content: 'Поехали'
                        }
                    ]
                },
                {
                    elem: 'performance',
                    content: [
                        {
                            elem: 'performance-inner',
                            content: [
                                {
                                    elem: 'performance-title',
                                    content: 'Почему VK Paper ?'
                                },
                                {
                                    elem: 'performance-item',
                                    content: 'Более 300 лучших сообществ собраны по категориям'
                                },
                                {
                                    elem: 'performance-item',
                                    content: 'Волшебный алгоритм отображения картинок'
                                },
                                {
                                    elem: 'performance-item',
                                    content: 'Новости можно читать без логина ВКонтакте'
                                },
                                {
                                    elem: 'start',
                                    mix: { block: 'login', elem: 'enter' },
                                    content: 'Войти ВКонтакте'
                                }
                            ]
                        },
                        {
                            elem: 'picture'
                        }
                    ]
                }
            ]
        }
    ]);

});

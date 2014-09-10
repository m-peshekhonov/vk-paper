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
                                    content: 'VK Paper'
                                },
                                {
                                    elem: 'about-text',
                                    content: 'Мы показываем самые интересные и важные новости лучших сообществ ВКонтакте в красивом и удобном формате!'
                                }
                            ]
                        },
                        {
                            elem: 'button',
                            mix: { block: 'login', elem: 'enter' },
                            content: 'Начать'
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
                                    mix: [
                                        {
                                            block: 'login',
                                            elem: 'enter'
                                        },
                                        {
                                            block: 'icon',
                                            mods: { type: 'vk' }
                                        }
                                    ],
                                    content: 'Войти ВКонтакте'
                                }
                            ]
                        },
                        {
                            elem: 'picture'
                        }
                    ]
                },
                {
                    elem: 'footer',
                    content: [
                        {
                            block: 'menu',
                            mix: { block: 'footer', elem: 'menu' },
                            content: [
                                {
                                    elem: 'item',
                                    mods: { type: 'vk' },
                                    url: '#',
                                    content: 'ВКонтакте'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'facebook' },
                                    url: '#',
                                    content: 'Facebook'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'twitter' },
                                    url: '#',
                                    content: 'Twitter'
                                }
                            ]
                        },
                        {
                            elem: 'author',
                            content: '© 2014 VK Paper'
                        }
                    ]
                }
            ]
        }
    ]);

});

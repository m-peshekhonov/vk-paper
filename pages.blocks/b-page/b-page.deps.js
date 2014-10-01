({
    mustDeps: [
        { block: 'i-global' },
        { block: 'i-router' },
        { block: 'i-collage' },
        { block: 'i-category' },
        { block: 'i-user' }
    ],
    shouldDeps: [
        {
            mods: {
                category: 'yes',
                login: ['no', 'yes']
            }
        },
        // data blocks
        { block: 'i-cookie' },
        { block: 'i-vk' },
        { block: 'api-vk' },
        // Components
        { block: 'link' },
        { block: 'input' },
        { block: 'menu' },
        { block: 'image' },
        { block: 'picture' },
        { block: 'button' },
        { block: 'icon' },
        { block: 'cf' },
        // common block's
        { block: 'header' },
        { block: 'content' },
        { block: 'main' },
        { block: 'scroll-top' },
        { block: 'feed' },
        { block: 'user' },
        { block: 'usermenu' },
        { block: 'box' },
        { block: 'recommends' },
        { block: 'source-block' },
        { block: 'share' },
        { block: 'loader' },
        { block: 'popup' }
    ]
})

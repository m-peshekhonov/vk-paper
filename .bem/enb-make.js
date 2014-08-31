//@see https://github.com/enb-make/enb
module.exports = require('../node_modules/bem-node/enb-make')
    // .freeze()
    .pages('app/*')
    .levels([
        // 'configs/' + process.env['YENV'] + '/common.blocks',
        'data.blocks',
        'common.blocks',
        'lib.blocks',
        'helpers.blocks',
        'pages.blocks'
    ]);

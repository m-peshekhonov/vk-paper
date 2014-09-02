BN.addDecl('feed').onSetMod({
    'js': function() {
        this.loadPortion();
    }
}).instanceProp({
    loadPortion: function() {

        // var testGroups = 'g15323631, g11283947, g7174154, g3940953, g27725748';

        BN('api-vk')._getPosts('g63102511').then(function(data) {

            // console.log(data);

            var groupsId = [],
                items = data.items,
                news = [],
                _this = this;

            data.items.forEach(function(item) {
                groupsId.push(String(item.source_id).slice(1));
            });

            BN('api-vk')._groupInfo(groupsId).then(function(data) {

                    data.forEach(function(gItem) {

                        items.forEach(function(item) {
                            var itemGID = String(item.source_id).slice(1);

                            if(+itemGID === gItem.gid) {
                                item.name = gItem.name;
                                item.screen_name = gItem.screen_name;
                                item.photo = gItem.photo;
                            }

                        })

                    });

                var news = items.map(function(item) {
                    return {
                        block: 'box',
                        data: item
                    }
                }, _this);

                BN('i-content')['append'](_this.domElem, news);

            });

        }.bind(this)).fail(function(err) {
            console.log('fail')
        }.bind(this));

    }
});

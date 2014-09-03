BN.addDecl('feed').onSetMod({
    js: function() {
        this.loadPortion();
    }
}).instanceProp({
    loadPortion: function() {

        var testGroups = 'g44384363';

        BN('api-vk')._getPosts(testGroups).then(function(data) {

            var _this = this,
                groupsId = [],
                news = [],
                items = data.items;

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

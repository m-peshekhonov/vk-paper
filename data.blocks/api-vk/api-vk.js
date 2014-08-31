BN.addDecl('api-vk').staticProp({

    _userID: BN('i-cookie').get('vkUser'),

    _user: function() {
        var promise = Vow.promise();

        VK.Api.call('users.get', 
            { 
                uids: this._userID,
                fields: 'photo_100, domain'
            }, 
                function(r) {
                if(r.response) {
                    promise.fulfill(r.response[0]);
                } 
            });

        return promise;
    },

    _suggestionsGroups: function(count) {
        var promise = Vow.promise();

        VK.Api.call('newsfeed.getSuggestedSources', 
            { 
                count: count,
                fields: 'photo_100',
                shuffle: 1 // перемешивать возвращаемый список.
            }, 
            function(r) {
                if(r.response) {
                    promise.fulfill(r.response);
                } 
            });

        return promise;
    },

    _getPosts: function (posts) {
        var promise = Vow.promise();

        VK.Api.call('newsfeed.get', 
            { 
                source_ids: posts,
                count: 15,
                filters: 'post'
            }, 
            function(r) {
                if(r.response) {
                    promise.fulfill(r.response);
                } 
            });

        return promise;
    },

    _groupInfo: function(groupIds) {
        var promise = Vow.promise();

        VK.Api.call('groups.getById', 
            { 
                group_ids: groupIds
            }, 
            function(r) {
                if(r.response) {
                    promise.fulfill(r.response);
                } 
            });

        return promise;
    }

});



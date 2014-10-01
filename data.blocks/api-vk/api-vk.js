BN.addDecl('api-vk').staticProp({
    // TODO: подумать как сделать лучше, с bem-node api
    _apiHost: 'https://api.vk.com/method/',
    _params: {
        access_token: BN('i-vk')._token,
        client_id: BN('i-vk')._userId
    },

    _request: function(url, dataType, options) {
        var params = this._params,
            promise = Vow.promise();

        // TODO: подумать как переделать
        // type && (type = !!~['GET', 'POST', 'PUT', 'DELETE'].indexOf(type.toUpperCase()) ? type : 'GET');
        // console.log(url + '&v=5.24&access_token=' + this._params.access_token);

        jQuery.ajax({
            type: 'GET',
            url: url + '&v=5.24&access_token=' + this._params.access_token,
            dataType : dataType || 'jsonp',
            cache: true,
            timeout: 20000,
            data: options ? jQuery.extend(params, options) : params,
            success: function(data) {
                if(data.error) {
                    promise.reject(data.error.error_msg);
                    console.log('error success request');
                }

                promise.fulfill(data.response);
            },
            error: function(err) {
                promise.reject(err);
                console.log('error request');
            }
        });

        return promise;
    },

    // информация о пользователе
    getUser: function() {
        var url = this._apiHost + 'users.get?user_id=' + this._params.client_id + '&fields=photo_100,domain';

        return this._request(url);
    },

    // рекомендованные страницы
    _suggestionsGroups: function(count) {
        var url = this._apiHost + 'newsfeed.getSuggestedSources?count=' + count + '&fields=photo_100&shuffle=1';

        return this._request(url);
    },
    // список новостей
    _getPosts: function(next_url, posts) {
        var url = this._apiHost + 'newsfeed.get?count=10&start_from=' + next_url + '&filters=post&source_ids=' + posts;

        return this._request(url);
    },

    // поиск новостей
    _searchPosts: function(next_url, query) {
        var url = this._apiHost + 'newsfeed.search?count=10&start_from=' + next_url + '&q=' + query;

        return this._request(url);
    },

    // подробная информация о сообществе
    _groupInfo: function(groupIds) {
        var url = this._apiHost + 'groups.getById?group_ids=' + groupIds;

        return this._request(url);
    },

    // лайки
    _like: function(owner_id, item_id) {
        var url = this._apiHost + 'likes.add?owner_id=' + owner_id + '&item_id=' + item_id;

        return this._request(url);
    },

    // лайки
    getPhotos: function(owner_id, item_id, count) {
        var url = this._apiHost + 'photos.get?count=' + count + '&owner_id=' + owner_id + '&album_id=' + item_id;

        return this._request(url);
    },

    setStorage: function (source) {
        var url = this._apiHost + 'storage.set?key=source&value=' + source + '&user_id=' + this._params.client_id;

        return this._request(url);
    },

    getStorage: function () {
        var url = this._apiHost + 'storage.get?key=source&user_id' + this._params.client_id;

        return this._request(url);
    }

});

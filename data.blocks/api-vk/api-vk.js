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
                // // TODO: доделать обработку ошибок
                // data.meta.code == '400' &&
                //     promise.reject(data.meta.error_message);

                promise.fulfill(data.response);
            },
            error: function(err) { promise.reject(err); }
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
    _getPosts: function(posts) {
        var url = this._apiHost + 'newsfeed.get?count=10&filters=post&source_ids=' + posts;

        return this._request(url);
    },

    // подробная информация о сообществе
    _groupInfo: function(groupIds) {
        var url = this._apiHost + 'groups.getById?group_ids=' + groupIds;

        return this._request(url);
    }

});

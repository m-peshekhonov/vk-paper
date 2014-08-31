BN.addDecl('i-vk').staticProp({

    init: function() {

        VK.init({
            apiId: 4453297
        });

        this._userID = BN('i-cookie').get('vkUser');

    },

    // Логинимся и записываем в куку id ппользователя
    login: function() {
        VK.Auth.login(function(data) {
            var data = data.session;

            if(data) {
                BN('i-cookie').set('vkUser', data.mid, { expires: 365 });
            }

            BN('i-router').reload();
        }, 8194); // 8194 - права доступа (wall + friends) https://vk.com/dev/permissions
    },

    logout: function() {
        VK.Auth.logout();

        this._clearCookie();
        BN('i-router').reload();
    },

    _clearCookie: function() {
        BN('i-cookie').set('vkUser', null);
    }


}).done();

BN('i-vk').init();

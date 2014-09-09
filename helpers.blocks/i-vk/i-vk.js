BN.addDecl('i-vk').staticProp({

    init: function() {

        this._token = BN('i-router').getHashVal('access_token');
        this._userId = BN('i-router').getHashVal('user_id');

        if (this._userId) {
            BN('i-cookie').set('vkUser', this._userId, { expires: 365 });
        }

        if (this._token) {
            BN('i-cookie').set('vkToken', this._token, { expires: 365 });

            return;
        }

        this._token = BN('i-cookie').get('vkToken');
        this._userId = BN('i-cookie').get('vkUser');
    },

    // Логинимся и записываем в куку id ппользователя
    login: function() {

        var urlParams = [
            'client_id=4536942',
            'scope=8194',
            'redirect_uri=http://127.0.0.1:3000',
            'display=popup',
            'v=5.24',
            'response_type=token'
        ],
        _authHost = 'https://oauth.vk.com/authorize?',
        url = _authHost + urlParams.join('&'),
        winLeft = ($(document).width() / 2) - 300;

        this._authWindow = window.open(url, 'Vk auth','menubar=no, location=no, resizable=no,scrollbars=no ,status=no, width=600, height=400, top=200,left=' + winLeft);

        this._checkAuthInterval = setInterval(function() {
            this._checkAuth();
        }.bind(this), 100);

    },

    isAuth: function() {
        return this._token ? 1 : 0;
    },

    _checkAuth: function() {
        this._token = BN('i-cookie').get('vkToken');

        (this._token && this._authWindow) && this._onAuth();
    },

    _onAuth: function() {
        clearInterval(this._checkAuthInterval);
        this._authWindow.close();
        BN('i-router').setPath('/feed');
        BN('i-router').reload();
    },

    logout: function() {
        this._token = null;
        this._clearCookie();
        BN('i-router').setPath('/', true);
        BN('i-router').reload();
    },

    _clearCookie: function() {
        BN('i-cookie').set('vkToken', null);
        BN('i-cookie').set('vkUser', null);
    }

}).done();

BN('i-vk').init();

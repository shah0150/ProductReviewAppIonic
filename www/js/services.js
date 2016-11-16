angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
  }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
  }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
  }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
  }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
  }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})


.factory('Items', function ItemsFactory($http) {
    return {
        getAll: function () {
            return $http({
                method: 'GET',
                url: 'data.json'
            });

        }
    }
})

.factory('rating', function ratingFactory($localStorage) {
    $localStorage = $localStorage.$default({
        rating: [],
        product: []
    });

    //Taken help and understood from Vaibhavi Desai
    var _add = function (rate, productId) {
        for (var i = 0; i < $localStorage.product.length; i++) {
            if (productId == $localStorage.product[i]) {
                $localStorage.rating.splice(i, 1)
                $localStorage.product.splice(i, 1)

            }
        }
        $localStorage.rating.push(rate);
        $localStorage.product.push(productId)

    }
    var _get = function (productId) {
        if ($localStorage.product.length > 0) {
            for (var i = 0; i < $localStorage.product.length; i++) {
                if (productId == $localStorage.product[i]) {
                    return $localStorage.rating[i]
                }
            }
        } else {
            return null
        }

    }
    return {
        add: _add,
        get: _get
    };

})

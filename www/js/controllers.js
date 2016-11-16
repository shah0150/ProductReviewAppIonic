angular.module('starter.controllers', ['ngStorage'])

// .controller('DashCtrl', function($scope) {})

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// })

.controller('categoryCtrl', ["$scope", "$stateParams", "Items", function ($scope, $stateParams, Items) {
    $scope.list = Items.getAll().then(
        function (response) {
            $scope.dataJson = response.data.categories;
            console.log($scope.dataJson);
        },
        function (err) {});

}])

.controller('booksCtrl', ["$scope", "$stateParams", "Items", function ($scope, $stateParams, Items) {
        //alert($stateParams.categoryID);
        $scope.books = [];
        $scope.booksInCategory = [];
        Items.getAll().then(
            function (response) {
                $scope.categoryID = $stateParams.categoryId;
                $scope.allData = response.data;
                $scope.books = $scope.allData.books;
                var numberofBooks = $scope.books.length;
                for (var i = 0; i < numberofBooks; i++) {
                    if ($scope.books[i].cat_id == $scope.categoryID) {
                        $scope.booksInCategory.push($scope.books[i]);
                    }
                }
                console.log($scope.booksInCategory)
            },
            function (err) {});
}])
    .controller('detailsCtrl', ["$scope", "$stateParams", "Items", "rating", function ($scope, $stateParams, Items, rating) {

        $scope.booksInCategory = [];
        Items.getAll().then(
            function (response) {
                $scope.allData;
                $scope.bookID = $stateParams.bookID;
                $scope.allData = response.data;
                $scope.books = $scope.allData.books;
                var numBooks = $scope.books.length;
                for (var i = 0; i < numBooks; i++) {
                    if ($scope.books[i]._id == $scope.bookID) {
                        $scope.title = $scope.books[i].title;
                        $scope.shortDescription = $scope.books[i].short_description;
                        $scope.longDescription = $scope.books[i].long_description;
                        $scope.price = $scope.books[i].price;
                        $scope.rating = $scope.books[i].rating;
                        $scope.image = $scope.books[i].image;
                        $scope.booksInCategory.push($scope.books[i]);
                        if (localStorage.getItem($scope.bookID) == null) {
                            $scope.ratingsObject.rating = $scope.booksInCategory[0].rating
                        } else {
                            $scope.ratingsObject.rating = localStorage.getItem($scope.bookID);
                        }
                    }
                }

            },
            function (err) {});

        $scope.rating = rating.get($scope.bookID)

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: $scope.rating,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };


        $scope.ratingsCallback = function (rating) {
            localStorage.setItem($scope.bookID, rating);
            console.log('Selected rating is : ', rating);
            ratingService.add(rating, $scope.bookID);

        };
        $scope.ratingsObject.rating = localStorage.getItem($scope.bookID);
}]);

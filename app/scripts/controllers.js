'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;
                $scope.showMenu = false;
                $scope.message = "Loading ...";
                menuFactory.getDishes().query(
                        function (response) {
                            $scope.dishes = response;
                            $scope.showMenu = true;
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });

                $scope.select = function (setTab) {
                    $scope.tab = setTab;

                    if (setTab === 2) {
                        $scope.filtText = "appetizer";
                    } else if (setTab === 3) {
                        $scope.filtText = "mains";
                    } else if (setTab === 4) {
                        $scope.filtText = "dessert";
                    } else {
                        $scope.filtText = "";
                    }
                };

                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.toggleDetails = function () {
                    $scope.showDetails = !$scope.showDetails;
                };

            }])

        .controller('ContactController', ['$scope', function ($scope) {

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

                var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

                $scope.channels = channels;
                $scope.invalidChannelSelection = false;

            }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

                $scope.sendFeedback = function () {

                    console.log($scope.feedback);

                    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                        $scope.invalidChannelSelection = true;
                        return false;
                    }
                    feedbackFactory.newFeedback().create($scope.feedback)
                            .$promise.then(
                                    function (response) {
                                        alert('Feedback added! Thank you!');
                                    },
                                    function (response) {
                                        alert("Error: " + response.status + " " + response.statusText);
                                    }
                            );

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();

                };
            }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                //Step 1: Create a JavaScript object to hold the comment from the form
                $scope.mycomment = {
                    author: "",
                    date: "",
                    rating: 5,
                    comment: ""
                };
                var ratings = [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4},
                    {value: 5}
                ];
                $scope.ratings = ratings;

                $scope.submitComment = function () {
                    $scope.mycomment.date = new Date().toISOString();
                    console.log($scope.mycomment);
                    $scope.dish.comments.push($scope.mycomment);

                    menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
                    $scope.commentForm.$setPristine();
                    $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
                };


            }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
                $scope.showDish = false;
                $scope.message = "Loading ...";
                $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                                function (response) {
                                    $scope.dish = response;
                                    $scope.showDish = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );
            }])



        // implement the IndexController and About Controller here - DONE

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

                $scope.showDish = false;
                $scope.message = "Loading ...";
                $scope.dish = menuFactory.getDishes().get({id: 0})
                        .$promise.then(
                                function (response) {
                                    $scope.dish = response;
                                    $scope.showDish = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );


                $scope.showPromoDish = false;
                $scope.messagePromo = "Loading ...";
                $scope.promoDish = menuFactory.getPromotion().get({id: 0})
                        .$promise.then(
                                function (response) {
                                    $scope.promoDish = response;
                                    $scope.showPromoDish = true;
                                },
                                function (response) {
                                    $scope.messagePromo = "Error: " + response.status + " " + response.statusText;
                                }
                        );

                $scope.showExecutive = false;
                $scope.messageExecutive = "Loading ...";
                $scope.executive = corporateFactory.getLeadership().get({id: 3})
                        .$promise.then(
                                function (response) {
                                    $scope.executive = response;
                                    $scope.showExecutive = true;
                                },
                                function (response) {
                                    $scope.messageExecutive = "Error: " + response.status + " " + response.statusText;
                                }
                        );

            }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

                $scope.showLeadership = false;
                $scope.messageLeadership = "Loading ...";
                corporateFactory.getLeadership().query(
                        function (response) {
                            $scope.leadership = response;
                            $scope.showLeadership = true;
                        },
                        function (response) {
                            $scope.messageLeadership = "Error: " + response.status + " " + response.statusText;
                        });




            }])




        ;
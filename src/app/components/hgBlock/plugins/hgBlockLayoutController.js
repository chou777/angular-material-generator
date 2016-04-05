export function HgBlockLayoutController($scope, $mdDialog, block, $timeout) {

  $scope.layoutAPI = {
    "layout": "row",
    "flex": 100,
    "flex-order": "row",
    "flex-offset": "row",
    "layout-align": "row",
    "layout-fill" : false,
    "layout-wrap" : true,
    "layout-nowrap" : false,
    "layout-margin" : false,
    "layout-padding " : false,
  }

  $scope.childrens = [{flex: "33"},{flex: "33"},{flex: "33"}],

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = () => {
    if (isEditor === true) {
      angular.extend(block,cacheBlock);
    }
    $mdDialog.cancel();
  };

  $scope.save = () => {
    if (isEditor === true) {
      $mdDialog.hide($scope.block);
    }else {
      $mdDialog.hide($scope.block);
    }
  };

}

HgBlockLayoutController.$inject = ["$scope", "$mdDialog", "block", "$timeout"];

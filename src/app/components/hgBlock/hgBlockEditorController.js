export function HgBlockEditorController($scope, $mdDialog, block, $timeout, $mdConstant) {
  $scope.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
  var blockObject = {
      "tag": "",
      "id": "",
      "classes": [],
      "blocks": [],
      "attr": {},
      "content": ''
  };

  var isEditor = false;
  if (block !== undefined) {
    $scope.block = block;
    var cacheBlock = angular.copy(block);
    isEditor = true;
  } else {
    $scope.block = blockObject;
  }

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

  $scope.addAttribute = {
    key: '',
    value: '',
    save: function() {
      if (this.key === '' || angular.isUndefined(this.key)) {
        return false;
      }
      var key = this.key ? this.key : '' ;
      var value = this.value;

      if (angular.isUndefined($scope.block.attr) || typeof $scope.block.attr != 'object') {
        $scope.block.attr = {};
      }
      this.key = '';
      this.value = '';
      $scope.block.attr[key] = value;
    }
  };

  $scope.removeAttribute = function(key){
    delete $scope.block.attr[key];
  };

}

HgBlockEditorController.$inject = ["$scope", "$mdDialog", "block", "$timeout", "$mdConstant"];

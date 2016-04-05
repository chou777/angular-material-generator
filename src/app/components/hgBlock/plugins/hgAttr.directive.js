
export function hgAttrDirective($compile, $timeout) {
  'ngInject';
  let directive = {
    restrict: 'A',
    scope: {
      hgAttr: '=?hgAttr',
    },
    controller: hgAttrController,
    controllerAs: 'attr',
    bindToController: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        post: function postLink(scope, iElement, iAttrs, controller, transclude) {
          scope.$watch(function(scope) {
            return scope.attr.hgAttr;
          }, function(newValue, oldValue) {
            if (angular.isDefined(oldValue)) {
              angular.forEach(oldValue, function(value, key){
                if (angular.isUndefined(newValue.key)) {
                  iElement.parent().removeAttr(key, value);
                }
              });
            }
            if (angular.isDefined(newValue)) {
              angular.forEach(newValue, function(value, key){
                iElement.parent().attr(key, value);
              });
            }
          },true);
        },
      }
    },

  };

  return directive;
}

class hgAttrController {
  constructor ($scope, $log, $timeout,$element, $mdDialog, toastr, $mdMedia) {
    'ngInject';

  }
}

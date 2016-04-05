export function hgBlockContentDirective($compile, $timeout) {
  'ngInject';
  let directive = {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      var el;
      $attrs.$observe('hgBlockContent', function (tpl) {
        el = $compile('<div>'+tpl+'</div>')($scope);
        $element.html("");
        $element.append(el);
      });
    },
  };
  return directive;
}



export function hgTemplateDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/hgTemplate/hgTemplate.html',
    scope: {
      templateData: '=?templateData'
    },
    controller: hgTemplateController,
    controllerAs: 'template',
    bindToController: true
  };

  return directive;
}

class hgTemplateController {
  constructor ($log, $timeout, $rootScope, $templateCache, $element, $scope, $compile) {
    'ngInject';

  }
}

export class GeneratorController {
  constructor ($timeout, $scope, $log, $rootScope, templateService, $mdDialog, $mdMedia) {
    'ngInject';
    this.tamplateService = templateService;
    this.templatesData =  {"tag": "div", "id": "", "classes": [ "page-wrapper" ]};
    this.isEdit = true;
    this.htmlCode = '';
    var useFullScreen = ($mdMedia('xs'));


    this.showSelectTemplate = () => {
      return $mdDialog.show({
        controller: TemplatesControllers,
        templateUrl: 'app/generator/templates.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
      });
    };

    this.showSelectTemplate()
      .then((layout) => {
        this.tamplateService.get({ layout: layout}).$promise.then((res) => {
          this.templatesData = angular.copy(res.templates);
        }, (err) => {
          $log.warn(err);
        });
      }, function() {
        // toastr.info('Cancel add block.');
      });



    this.showHtml = (data) => {
      this.blockToHtml(angular.copy(data));
      return $mdDialog.show({
        controller: ShowHtmlCodeControllers,
        templateUrl: 'app/generator/showHtmlCode.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: { htmlCode: this.htmlCode }
      });


    };

    this.blockToHtml = (block) => {
      // tag
      this.htmlCode += '<' + block.tag;
      //id
      if (angular.isDefined(block.id) && block.id != '') {
        this.htmlCode += ' id="' + block.id + '"';
      }
      // class
      if (angular.isDefined(block.classes) && block.classes.length > 0) {
        this.htmlCode += ' class="';
        let classCount = 0;
        for (var domClass in block.classes) {
          this.htmlCode += block.classes[domClass];
          if (block.classes.length != classCount + 1){
            this.htmlCode+= ' ';
          }
          classCount++;
        }
        this.htmlCode += '"';
      }
      // attr
      if (angular.isDefined(block.attr) && Object.keys(block.attr).length > 0) {
        let attrCount = 0;
        this.htmlCode +=  ' ';
        for (var attr in block.attr) {
          this.htmlCode += attr + '="' + block.attr[attr] + '"';
          if (Object.keys(block.attr).length != attrCount + 1){
            this.htmlCode+= ' ';
          }
          attrCount++;
        }
      }

      this.htmlCode += '>'
      if (angular.isDefined(block.content) && block.content != '') {
        this.htmlCode += block.content;
      }
      if (angular.isDefined(block.blocks) && block.blocks.length > 0) {
        for (var i = 0; i < block.blocks.length; i++) {
          this.blockToHtml(block.blocks[i]);
        }
      }
      this.htmlCode += '</' + block.tag + '>';
    };
  }
}



function TemplatesControllers($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.handleSelectTemplate = function(layout) {
    $mdDialog.hide(layout);
  }
}

function ShowHtmlCodeControllers($scope, $mdDialog, htmlCode) {
  $scope.htmlCode = htmlCode;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}

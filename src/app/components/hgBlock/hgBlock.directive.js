
import { HgBlockEditorController } from './hgBlockEditorController.js';
import { HgBlockLayoutController } from './plugins/hgBlockLayoutController.js';


export function hgBlockDirective($compile, $timeout) {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: {
      blockData: '=?blockData',
      tag: '=?tag',
      index: '=?index'
    },
    transclude: true,
    templateUrl: 'app/components/hgBlock/hgBlock.html',
    controller: hgBlockController,
    controllerAs: 'block',
    bindToController: true,
    compile: function(tElement, tAttrs, transclude) {
      tElement.addClass('hg-block');
      var contents = tElement.contents().remove();
      var compiledContents;
      return {
        pre: function preLink(scope, iElement, iAttrs, transclude) {
          if(!compiledContents) {
              compiledContents = $compile(contents, transclude);
          }
          compiledContents(scope, function(clone, scope) {
            iElement.append(clone);
          });
        },
      }
    },
  };

  return directive;
}

class hgBlockController {
  constructor ($scope, $log, $timeout,$element, $mdDialog, toastr, $mdMedia, $sce, $compile) {
    'ngInject';
    this.addBlock = (index, block) => {
      this.blockData.blocks.push(block);
    }

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

    this.removeBlock = (index) => {
      // console.log(index);
      // console.log(index);
      // console.log( $scope.$parent.$parent.block.blockData.blocks);
      $scope.$parent.$parent.block.blockData.blocks.splice(index, 1)
      toastr.success('Success remove block.');
    }

    this.showRemoveBlockConfirm = (ev, index) => {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Would you like to delete this block?')
            .textContent('All of the block child will be delete!!')
            .ariaLabel('Confirm delete!')
            .targetEvent(ev)
            .ok('Please delete!')
            .cancel('Cancel');
      $mdDialog.show(confirm).then(() => {
        this.removeBlock(index);
      }, function() {
        toastr.info('Cancel remove block.');
      });
    };

    this.showEditorBlock = function(ev, index) {
      this.editorBlockDialog(ev, this.blockData)
      .then((block) => {
        toastr.info('Success edit block.');
      }, function() {
        toastr.info('Cancel edit block.');
      });
    };

    this.showAddBlock = function(ev, index) {
      this.editorBlockDialog(ev, undefined)
      .then((block) => {
        this.addBlock(index, block);
        toastr.info('Success add block.');
      }, function() {
        toastr.info('Cancel add block.');
      });
    };

    // this.showAddLayout = function(ev, index) {
    //   let controller = HgBlockLayoutController;
    //   let templateUrl = '/app/components/hgBlock/plugins/hgBlockLayout.html';
    //   this.addBlockDialog(ev, controller, templateUrl)
    //   .then((block) => {
    //     this.addBlock(index, block);
    //     toastr.info('Success add block.');
    //   }, function() {
    //     toastr.info('Cancel add block.');
    //   });
    // };

    // this.addBlockDialog = function(ev, controller, templateUrl) {
    //   return $mdDialog.show({
    //     controller: controller,
    //     templateUrl: templateUrl,
    //     parent: angular.element(document.body),
    //     targetEvent: ev,
    //     clickOutsideToClose:true,
    //     fullscreen: useFullScreen,
    //     locals: { block: undefined }
    //   })
    // };

    this.showCopyBlockConfirm = (ev, index, copyBlock) => {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Would you like to copy this block?')
            .textContent('All of the block child will be copy!!')
            .ariaLabel('Confirm copy!')
            .targetEvent(ev)
            .ok('Please Copy!')
            .cancel('Cancel');
      $mdDialog.show(confirm).then(() => {
        this.copyBlock(index, copyBlock);
      }, function() {
        toastr.info('Cancel copy block.');
      });
    };

    this.copyBlock = function(index, block) {
      console.log(block);
      console.log($scope.$parent.$parent.block.blockData.blocks);
      $scope.$parent.$parent.block.blockData.blocks.splice(index, 0, angular.copy(block));
    };

    this.editorBlockDialog = function(ev, block) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      return $mdDialog.show({
        controller: HgBlockEditorController,
        templateUrl: 'app/components/hgBlock/hgBlockEditor.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: { block: block }
      });
    };


  }

}

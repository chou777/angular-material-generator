/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GeneratorController } from './generator/generator.controller';
import { hgTemplateDirective } from './components/hgTemplate/hgTemplate.directive';
import { hgBlockDirective } from './components/hgBlock/hgBlock.directive';
import { hgBlockContentDirective } from './components/hgBlock/plugins/hgBlockContent.directive';
import { hgAttrDirective } from './components/hgBlock/plugins/hgAttr.directive';
import { templateService } from './services/template.service';


angular.module('htmlGenerator', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngMaterial', 'toastr', 'RecursionHelper', 'underscore'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('GeneratorController', GeneratorController)
  .factory('templateService', templateService)
  .directive('hgTemplate', hgTemplateDirective)
  .directive('hgBlockContent', hgBlockContentDirective)
  .directive('hgBlock', hgBlockDirective)
  .directive('hgAttr', hgAttrDirective)




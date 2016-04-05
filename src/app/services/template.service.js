export function templateService($resource) {
  'ngInject';


  return $resource('assets/layout/:layout.json', { layout: '@layout' }, false);

}


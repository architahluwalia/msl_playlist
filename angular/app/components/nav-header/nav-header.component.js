class NavHeaderController {
    constructor($rootScope, ContextService, $state) {
        'ngInject'

        let navHeader = this
        let stateName = $state.current.name;
        if (stateName.indexOf('front.') >= 0) {
            angular.element("body").addClass('sidebar-collapse');
            this.tempUrl = './views/app/components/nav-header/nav-header.front.html';
        } else {
            this.tempUrl = './views/app/components/nav-header/nav-header.component.html';
        }
        ContextService.me(function(data) {
            navHeader.userData = data
        })
        angular.element(".content-wrapper").bind("click", function(obj) {
            // angular.element(".treeview-menu").toggle();
            angular.element("body").addClass('sidebar-collapse');
        })
    }

    $onInit() {}
}

export const NavHeaderComponent = {
    template: '<div ng-include="vm.tempUrl"></div>',
    controller: NavHeaderController,
    controllerAs: 'vm',
    bindings: {}
}
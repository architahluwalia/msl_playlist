export function RoutesRun($rootScope, $state, $auth, AclService, $timeout, API, ContextService) {
    'ngInject'

    AclService.resume()

    /*eslint-disable */
    let deregisterationCallback = $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.data && toState.data.auth) {
            if (!$auth.isAuthenticated()) {
                event.preventDefault()
                return $state.go('login')
            }
        }

        $rootScope.bodyClass = 'hold-transition login-page'
    })

    function stateChange() {
        $timeout(function() {
            // fix sidebar
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight()
            var window_height = $(window).height()
            var sidebar_height = $('.sidebar').height()

            if ($('body').hasClass('fixed')) {
                $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight())
            } else {
                if (window_height >= sidebar_height) {
                    $('.content-wrapper, .right-side').css('min-height', window_height - neg)
                } else {
                    $('.content-wrapper, .right-side').css('min-height', sidebar_height)
                }
            }

            // get user current context
            if ($auth.isAuthenticated() && !$rootScope.me) {
                ContextService.getContext()
                    .then((response) => {
                        response = response.plain()
                        $rootScope.me = response.data
                    })
            }
        })
    }
    $rootScope.openEditModal = function(template, mainScope, filterId = null) {
        let vm = mainScope;
        console.log('mani', filterId);
        if (filterId !== null) {
            vm.$scope.filterId = filterId;
        } else {
            vm.$scope.filterId = null;
        }
        console.log('mani', vm);
        vm.$scope.modalInstance = vm.uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: '<' + template + '></' + template + '>',
            size: 'lg',
            // appendTo: angular.element(document.querySelector('.userWrapper:eq(0)')),
            windowTopClass: 'userWrapper',
            windowClass: 'uni-album',
            scope: vm.$scope
        });
    };

    $rootScope.$on('$destroy', deregisterationCallback)
    $rootScope.$on('$stateChangeSuccess', stateChange)
        /*eslint-enable */
}
export class APIService {
    constructor(Restangular, $window) {
        'ngInject'
        // content negotiation
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json'
        }

        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl('/api/')
                .setDefaultHeaders(headers)
                .setErrorInterceptor(function(response) {
                    if (response.status === 401) {
                        $auth.logout().then(function() {
                            delete $rootScope.me;
                            AclService.flushRoles();
                            AclService.setAbilities({});
                            $state.go('login');
                        });
                    } else {
                        var errorText = [];
                        if (angular.isUndefined(response.data.errors)) {
                            errorText.push(response.data.message);
                        } else {
                            if (angular.isUndefined(response.data.errors.message)) {
                                angular.forEach(response.data.errors, function(errorMsg) {
                                    errorText.push(errorMsg);
                                });
                            } else {
                                let error = response.data.errors.message[0];
                                errorText.push(error);
                            }
                        }
                        var errorMessage = errorText.join('');
                        // if (errorMessage == "Token has expired") {
                        //     $auth.logout().then(function() {
                        //         delete $rootScope.me;
                        //         AclService.flushRoles();
                        //         AclService.setAbilities({});

                        //         var previousState = $rootScope.previousState;
                        //         var previousParams = $rootScope.previousParams;
                        //         var allowRedirect = true;
                        //         if (previousState.data.role != undefined && previousState.data.role != "") {
                        //             if (!AclService.hasRole(previousState.data.role)) {
                        //                 allowRedirect = false;
                        //             }
                        //         }

                        //         if (previousState.data.permission != undefined && previousState.data.permission != "") {
                        //             if (!AclService.can(previousState.data.permission)) {
                        //                 allowRedirect = false;
                        //             }
                        //         }

                        //         if (allowRedirect == true) {
                        //             $state.go($rootScope.previousState, $rootScope.previousParams)
                        //         } else {
                        //             $state.go('login');
                        //         }
                        //     });
                        // }
                        swal('Error', errorMessage, "error");
                    }
                })
                .addFullRequestInterceptor(function(element, operation, what, url, headers) {
                    var token = $window.localStorage.satellizer_token
                    if (token) {
                        headers.Authorization = 'Bearer ' + token
                    }
                })
                .addResponseInterceptor(function(response, operation, what) {
                    if (operation === 'getList') {
                        var newResponse = response.data[what]
                        newResponse.error = response.error
                        return newResponse
                    }

                    return response
                })
        })
    }
}
export function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject'
    // $locationProvider.html5Mode(true);

    var getView = (viewName) => {
        return `./views/app/pages/${viewName}/${viewName}.page.html`
    }

    var getLayout = (layout) => {
        return `./views/app/pages/layout/${layout}.page.html`
    }

    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: getLayout('layout')
                },
                'header@app': {
                    templateUrl: getView('header')
                },
                'footer@app': {
                    templateUrl: getView('footer')
                },
                main: {}
            },
            data: {
                bodyClass: 'hold-transition skin-blue sidebar-mini'
            }
        })
        .state('front', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: getLayout('front-layout')
                },
                'header@front': {
                    template: '<nav-header></nav-header>'
                },/*
                'footer@front': {
                    templateUrl: getView('footer')
                },*/
                main: {}
            },
            data: {
                bodyClass: 'hold-transition skin-blue sidebar-mini'
            }
        })
        .state('app.landing', {
            url: '/',
            data: {
                auth: true
            },
            title: "Home",
            views: {
                'main@app': {
                    template: '<dashboard></dashboard>'
                }
            }
        })
        .state('app.videosearch', {
            url: '/search',
            data: {
                auth: true
            },
            title: "Search",
            views: {
                'main@app': {
                    template: '<video-search></video-search>'
                }
            }
        })
        .state('app.playlist', {
            url: '/playlist',
            data: {
                auth: true
            },
            title: "Playlists",
            views: {
                'main@app': {
                    template: '<playlist-list></playlist-list>'
                }
            }
        })
        // .state('front.landing', {
        //     url: '/playlist/:id',
        //     // data: {
        //     // auth: true
        //     // },
        //     title: "Playlist",
        //     views: {
        //         'main@front': {
        //             template: '<playlist-public></playlist-public>'
        //         }
        //     }
        // })
        .state('front.playlist-public', {
            url: '/playlist/:id',
            // data: {
            // auth: true
            // },
            title: "Playlist",
            views: {
                'main@front': {
                    template: '<playlist-public></playlist-public>'
                }
            }
        })
        .state('front.playlists', {
            url: '/playlists',
            // data: {
            // auth: true
            // },
            title: "Playlists All",
            views: {
                'main@front': {
                    template: '<playlist-list></playlist-list>'
                }
            }
        })
        .state('app.comingsoon', {
            url: '/comingsoon',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<coming-soon></coming-soon>'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            data: {
                auth: true
            },
            title: "Profile",
            views: {
                'main@app': {
                    template: '<user-profile></user-profile>'
                }
            },
            params: {
                alerts: null
            }
        })
        .state('app.userlist', {
            url: '/user-lists',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-lists></user-lists>'
                }
            }
        })
        .state('app.useredit', {
            url: '/user-edit/:userId',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-edit></user-edit>'
                }
            },
            params: {
                alerts: null,
                userId: null
            }
        })
        .state('app.userroles', {
            url: '/user-roles',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-roles></user-roles>'
                }
            }
        })
        .state('app.userpermissions', {
            url: '/user-permissions',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-permissions></user-permissions>'
                }
            }
        })
        .state('app.userpermissionsadd', {
            url: '/user-permissions-add',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-permissions-add></user-permissions-add>'
                }
            },
            params: {
                alerts: null
            }
        })
        .state('app.userpermissionsedit', {
            url: '/user-permissions-edit/:permissionId',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-permissions-edit></user-permissions-edit>'
                }
            },
            params: {
                alerts: null,
                permissionId: null
            }
        })
        .state('app.userrolesadd', {
            url: '/user-roles-add',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-roles-add></user-roles-add>'
                }
            },
            params: {
                alerts: null
            }
        })
        .state('app.userrolesedit', {
            url: '/user-roles-edit/:roleId',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<user-roles-edit></user-roles-edit>'
                }
            },
            params: {
                alerts: null,
                roleId: null
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'layout': {
                    templateUrl: getView('login')
                },
                'header@app': {},
                'footer@app': {}
            },
            data: {
                bodyClass: 'hold-transition login-page'
            },
            title: "Login",
            params: {
                registerSuccess: null,
                successMsg: null
            }
        })
        .state('loginloader', {
            url: '/login-loader',
            views: {
                'layout': {
                    templateUrl: getView('login-loader')
                },
                'header@app': {},
                'footer@app': {}
            },
            data: {
                bodyClass: 'hold-transition login-page'
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'layout': {
                    templateUrl: getView('register')
                },
                'header@app': {},
                'footer@app': {}
            },
            title: "Register",
            data: {
                bodyClass: 'hold-transition register-page'
            }
        })
        .state('userverification', {
            url: '/userverification/:status',
            views: {
                'layout': {
                    templateUrl: getView('user-verification')
                }
            },
            data: {
                bodyClass: 'hold-transition login-page'
            },
            params: {
                status: null
            }
        })
        .state('forgot_password', {
            url: '/forgot-password',
            views: {
                'layout': {
                    templateUrl: getView('forgot-password')
                },
                'header@app': {},
                'footer@app': {}
            },
            title: "Forgot Password",
            data: {
                bodyClass: 'hold-transition login-page'
            }
        })
        .state('reset_password', {
            url: '/reset-password/:email/:token',
            views: {
                'layout': {
                    templateUrl: getView('reset-password')
                },
                'header@app': {},
                'footer@app': {}
            },
            data: {
                bodyClass: 'hold-transition login-page'
            }
        })
        .state('app.logout', {
            url: '/logout',
            views: {
                'main@app': {
                    controller: function($rootScope, $scope, $auth, $state, AclService) {
                        $auth.logout().then(function() {
                            delete $rootScope.me
                            AclService.flushRoles()
                            AclService.setAbilities({})
                            $state.go('login')
                        })
                    }
                }
            }
        })
}
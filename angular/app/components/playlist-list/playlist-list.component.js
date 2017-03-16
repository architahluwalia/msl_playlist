class PlaylistListController {
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API, $rootScope, $uibModal) {
        'ngInject'
        let vm = this;
        vm.API = API
        vm.$state = $state
        vm.$scope = $scope
        vm.uibModal = $uibModal;
        this.dtInstance = {};
        let stateName = $state.current.name;
        let playlists = this.API.service('playlists')
        if ('front.playlists' === stateName) {
            this.tempUrl = './views/app/components/playlist-list/playlist-list.front.html';
            playlists.one('front').get().then(function(response) {
                response = response.plain();
                vm.$scope.playlists = response.data.playlists;
            });
        } else {
            this.tempUrl = './views/app/components/playlist-list/playlist-list.component.html';
            this.dtOptions = DTOptionsBuilder

                .fromFnPromise(function() {
                    return playlists.getList();
                })
                // .newOptions()                    
                .withOption('createdRow', function(row) {
                    $compile(angular.element(row).contents())($scope)
                })
                .withOption('responsive', true)
                .withOption('order', [1, 'desc'])
                .withOption('reloadData', function() {
                    this.reload = true;
                    return this;
                })
                .withBootstrap()

            this.dtColumns = [
                DTColumnBuilder.newColumn('name').withTitle('Name'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                .renderWith(function(data) {
                    return `
                <a class="btn btn-xs btn-warning" ng-click="vm.openEditModal('playlist-edit', vm, {id: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>
                &nbsp
                <button class="btn btn-xs btn-warning" ng-click="vm.share(${data.id})">
                    <i class="fa fa-share"></i>
                </button>`;
                })
            ]

            this.displayTable = true
        }

        this.openEditModal = $rootScope.openEditModal;

    }

    share(id) {
        swal({
            title: 'Sharable url:',
            text: this.$state.href('front.playlist-public', {
                'id': id
            }, {
                absolute: true
            }),
            type: 'success',
            showCancelButton: false,
            // confirmButtonText: 'Reset token!',
            // cancelButtonText: 'OK',
            closeOnConfirm: true,
            // closeOnCancel: true
        });
    }
    getupdatedData() {
        let vm = this;
        vm.dtInstance.reloadData(function(json) {}, false);
    }

    delete(id) {
        let API = this.API
        let $state = this.$state
        let vm = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            html: false
        }, function() {
            API.one('playlists').one('playlist', id).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Playlist has been deleted.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function() {
                        // $state.reload()
                        vm.getupdatedData();
                    })
                })
        })
    }
}

export const PlaylistListComponent = {
    template: '<div ng-include="vm.tempUrl"></div>',
    controller: PlaylistListController,
    controllerAs: 'vm',
    bindings: {}
}
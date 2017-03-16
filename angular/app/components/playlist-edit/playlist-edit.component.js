class PlaylistEditController {
    constructor($scope, API, $compile, DTOptionsBuilder, DTColumnBuilder) {
        'ngInject';
        this.$scope = $scope;
        this.API = API;
        let vm = this;
        vm.$scope.playlist = {};

        if (angular.isUndefined($scope.$parent.filterId) || $scope.$parent.filterId == null) {
            vm.$scope.heading = 'Create PLaylist';
        } else {
            vm.$scope.heading = 'Edit playlist';
            vm.$scope.playlist.id = $scope.$parent.filterId.id;
            this.API.service('playlist', this.API.all('playlists')).one(vm.$scope.playlist.id).get().then(function(response) {
                response = response.plain();
                vm.$scope.playlist.name = response.data.name;
                vm.completeData = response.data.tracks;
                vm.$scope.checked = [];
                vm.$scope.playlist.unchecked = [];

                angular.forEach(vm.completeData, function(track) {
                    vm.$scope.checked.push(track.id);
                })
                vm.dtOptions = DTOptionsBuilder.newOptions()
                    // .withOption('order', [2, 'desc'])
                    .withOption('data', vm.completeData)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    // .withOption('headerCallback', function(header) {
                    //     if (!vm.headerCompiled) {
                    //         // Use this headerCompiled field to only compile header once
                    //         vm.headerCompiled = true;
                    //         $compile(angular.element(header).contents())($scope);
                    //     }
                    // })
                    .withBootstrap();

                vm.dtColumns = [];

                vm.dtColumns.push(
                    DTColumnBuilder.newColumn('title').withTitle('Title'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                    .renderWith(function(data) {
                        return `
                            <md-checkbox ng-checked="vm.exists(${data.id})" ng-click="vm.toggle(${data.id})">                                
                            </md-checkbox>`;
                    }) // 
                );
                vm.displayTable = true;

            });
            let createdRow = (row) => {
                $compile(angular.element(row).contents())($scope);
            };
        }
    }

    toggle(item) {
        var idx = this.$scope.checked.indexOf(item);
        if (idx > -1) {
            this.$scope.checked.splice(idx, 1);
            this.$scope.playlist.unchecked.push(item);
        } else {
            this.$scope.playlist.unchecked.splice(idx, 1);
            this.$scope.checked.push(item);
        }

    }

    exists(item) {
        return this.$scope.checked.indexOf(item) > -1;
    }

    closeModal() {
        let modalInstance = this.$scope.$parent.modalInstance;
        modalInstance.dismiss('cancel');
    }

    save($valid) {
        let vm = this;
        if ($valid) {
            this.API.service('playlist', this.API.all('playlists')).post(this.$scope.playlist)
                .then(function(response) {
                    vm.$scope.$parent.vm.getupdatedData();
                    if (angular.isUndefined(vm.$scope.$parent.filterId) || vm.$scope.$parent.filterId == null) {
                        swal('success', 'New Playlist Created', 'success');
                    } else {
                        swal('success', 'Playlist Updated', 'success');
                    }
                    vm.closeModal();
                });
        }
    }

    $onInit() {}
}

export const PlaylistEditComponent = {
    templateUrl: './views/app/components/playlist-edit/playlist-edit.component.html',
    controller: PlaylistEditController,
    controllerAs: 'vm',
    bindings: {}
}
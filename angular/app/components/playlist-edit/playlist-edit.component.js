class PlaylistEditController{
    constructor($scope, API){
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
            });
        }
    }

    closeModal() {
        let modalInstance = this.$scope.$parent.modalInstance;
        modalInstance.dismiss('cancel');
    }

    save($valid) {
        console.log(this.form);
        let vm = this;
        if ($valid) {
            this.API.service('playlist', this.API.all('playlists')).post(this.$scope.playlist)
            .then(function(response) {
                swal('success', 'New Playlist Created', 'success');
                vm.closeModal();
            });
        }
    }

    $onInit(){
    }
}

export const PlaylistEditComponent = {
    templateUrl: './views/app/components/playlist-edit/playlist-edit.component.html',
    controller: PlaylistEditController,
    controllerAs: 'vm',
    bindings: {}
}

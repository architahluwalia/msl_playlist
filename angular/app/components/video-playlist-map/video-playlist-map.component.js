class VideoPlaylistMapController{
    constructor($scope, API){
        'ngInject';
        this.$scope = $scope;
        this.API = API;
        let vm = this;
        vm.$scope.playlists = $scope.$parent.filterId.playlists;
        vm.$scope.title = $scope.$parent.filterId.title;
        console.log($scope.playlists);
        vm.$scope.selectedPlay = [];
        this.API.service('playlist-by-track', this.API.all('playlists')).one($scope.$parent.filterId.id).get(this.$scope.playlist).then(function (response) {
            response = response.plain();
            angular.forEach(response.data, function (play) {
                vm.$scope.selectedPlay.push(play.id);
            })
            // vm.$scope.selectedPlay = response.data;
            console.log(vm.$scope.selectedPlay);
        });

        //
    }
    closeModal() {
        let modalInstance = this.$scope.$parent.modalInstance;
        modalInstance.dismiss('cancel');
    }

    save($valid) {
        console.log(this.form);
        let vm = this;
        if ($valid) {
            this.API.service('add-to-playlist', this.API.all('playlists')).post({playlists : this.$scope.selectedPlay, track: vm.$scope.$parent.filterId.id, title:vm.$scope.title})
            .then(function(response) {
                swal('success', 'Song added to playlist', 'success');
                vm.closeModal();
            });
        }
    }

}

export const VideoPlaylistMapComponent = {
    templateUrl: './views/app/components/video-playlist-map/video-playlist-map.component.html',
    controller: VideoPlaylistMapController,
    controllerAs: 'vm',
    bindings: {}
}

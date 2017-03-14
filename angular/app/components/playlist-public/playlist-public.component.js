class PlaylistPublicController{
    constructor($scope, API, $stateParams){
        'ngInject';
        this.$scope = $scope;
        this.API = API;
        let vm = this;
        vm.playlist = {};
        this.API.service('playlist').one($stateParams.id).get().then(function(response) {
            response = response.plain();
            vm.playlist.name = response.data.name;
            vm.playlist.videos = response.data.tracks;
        });
        //
    }

    $onInit(){
    }
}

export const PlaylistPublicComponent = {
    templateUrl: './views/app/components/playlist-public/playlist-public.component.html',
    controller: PlaylistPublicController,
    controllerAs: 'vm',
    bindings: {}
}

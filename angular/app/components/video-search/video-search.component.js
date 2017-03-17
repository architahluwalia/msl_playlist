class VideoSearchController{
    constructor(API, $scope, $rootScope, $uibModal){
        'ngInject';
        this.API = API;
        this.$scope = $scope;
        this.openEditModal = $rootScope.openEditModal;
        this.uibModal = $uibModal;
        this.showPlaylist = {};
        let vm = this;
        vm.token = null;
        vm.videos = [];
        let playlists = this.API.service('playlists');
        playlists.getList().then(function (response) {
            let dataSet = response.plain()
            vm.$scope.playlists = dataSet;
        });
        //
    }

    search(token = null){
        let vm = this; 
        let search = this.API.service('video-search', this.API.all('ytvideo')).one(vm.query);

        if (token !=null) {
            search = search.one(token);
        }
        search.get().then(function (response) {
            response = response.plain();
            if (token== null) {
                vm.videos = response.data.results;
            } else {
                vm.videos = vm.videos.concat(response.data.results); 
            }
            console.log(vm.videos);
            console.log(response);
            // vm.videos.push(response.data.results);
            vm.token = response.data.pageToken;
        });
    }

    addTo(id) {
        this.showPlaylist = {};
        this.showPlaylist[id] = id;
    }

    $onInit(){
    }
}

export const VideoSearchComponent = {
    templateUrl: './views/app/components/video-search/video-search.component.html',
    controller: VideoSearchController,
    controllerAs: 'vm',
    bindings: {}
}

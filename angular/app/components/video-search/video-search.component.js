class VideoSearchController{
    constructor(API, $scope, $rootScope, $uibModal){
        'ngInject';
        this.API = API;
        this.$scope = $scope;

        this.openEditModal = $rootScope.openEditModal;
        this.uibModal = $uibModal;
        this.showPlaylist = {};
        let vm = this;
        let playlists = this.API.service('playlists');
        playlists.getList().then(function (response) {
            let dataSet = response.plain()
            vm.$scope.playlists = dataSet;
        });
        //
    }

    search(){
        let vm = this; 
        console.log(this);
       let search = this.API.service('video-search', this.API.all('ytvideo')).one(vm.query)
        search.get().then(function (response) {
            console.log(response);
            response = response.plain();
            vm.videos = response.data;
        });
    }

    addTo(id) {
        this.showPlaylist = {};
        this.showPlaylist[id] = id;
        console.log(this.showPlaylist);
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

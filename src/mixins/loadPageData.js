import wepy from 'wepy';

export default class loadPageData extends wepy.mixin {
    data = {
        currentPage: 1,
        count: 10,
        totalPages: 1,
        loadingMore: false,
        loadedAll:false,
    };
    onReachBottom() {
        if (this.currentPage < this.totalPages && !this.loadingMore) {
            this.loadingMore = true;
            this.currentPage++;
            this.onLoad();
        }else{
            this.loadedAll = true;
            this.$apply();
        }
    }
}

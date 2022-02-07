<template>
    <transition name="slide-up">
        <div class="shelf-footer" v-show="isEditMode" >
            <tab-bar class="shelf-footer-bar" :class="{'is-selected': bookSelected}">
                <!-- 私密阅读 -->
                <tab-bar-item @tabClick="showPrivate">
                    <i class="icon-private" slot="item-icon" v-if="!isPrivate"></i>
                    <i class="icon-private-see" slot="item-icon" v-else></i>
                    <div slot="item-text" class="shelf-footer-text">{{ isPrivate ? $t('shelf.noPrivate') : $t('shelf.private')}}</div>
                </tab-bar-item>
                <!-- 开启离线 -->
                <tab-bar-item @tabClick="showDownLoad">
                    <i class="icon-download" slot="item-icon" v-if="!isDownLoad"></i>
                    <i class="icon-download-remove" slot="item-icon" v-else></i>
                    <div slot="item-text" class="shelf-footer-text">{{isDownLoad ? $t('shelf.delete') : $t('shelf.download')}}</div>
                </tab-bar-item>
                <!-- 移动到 -->
                <tab-bar-item @tabClick="showDialog">
                    <i class="icon-move" slot="item-icon"></i>
                    <div slot="item-text" class="shelf-footer-text">{{$t('shelf.move')}}</div>
                </tab-bar-item>
                <!-- 移除书架 -->
                <tab-bar-item @tabClick="showRemove">
                    <i class="icon-shelf danger-color" slot="item-icon"></i>
                    <div slot="item-text" class="shelf-footer-text danger-color">{{$t('shelf.remove')}}</div>
                </tab-bar-item>
            </tab-bar>
        </div>
    </transition>

</template>
<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
import {storeShelfMixin} from 'utils/mixin'
import {saveBookShelf, removeLocalStorage} from 'utils/localStorage'
import {removeLocalForage} from 'utils/localForage'
import {download} from 'network/index'
export default {
   name:'ShelfFooter',
   components: {
       TabBar,
       TabBarItem
   },
   computed: {
       bookSelected() {
           const selectedNum = this.shelfSelected.filter(item => item.selected === true).length
           return selectedNum > 0 ? true : false
       },
       // 是否为私密状态
       isPrivate() {
           if(!this.bookSelected) {
               return false
           } else {
               return this.shelfSelected.length > 0 ? this.shelfSelected.every(item => item.private) : false
           }
       },
       // 是否已经离线下载
       isDownLoad() {
           if(!this.bookSelected) {
               return false
           } else {
               return this.shelfSelected.length > 0 ? this.shelfSelected.every(item => item.cache) : false
           }
       },
   },
   mixins: [storeShelfMixin],
   methods: {
       // 隐藏Popup
       hidePopup() {
           this.popupMenu.hide()
       },

       // 1. 私密阅读 popup
       showPrivate() {
           if(!this.bookSelected) {
               return
           }
           this.popupMenu = this.popup({
               title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
               btn: [
                   {
                       text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
                       click: () => {
                           this.setPrivate()
                       }
                   },
                   {
                       text: this.$t('shelf.cancel'),
                       click: () => {
                           this.hidePopup()
                       }
                   }
               ]
           }).show()
       },
       // 1.1 开启或关闭私密阅读
       setPrivate() {
           let isPrivate
           if(this.isPrivate) {
               isPrivate = false
           } else {
               isPrivate = true
           }
           this.shelfSelected.forEach(book => {
               book.private = isPrivate
           })
           this.onComplete()
           if(isPrivate) {
               this.simpleToast(this.$t('shelf.setPrivateSuccess'))
           } else {
               this.simpleToast(this.$t('shelf.closePrivateSuccess'))
           }
       },

       // 2. 离线缓存
       showDownLoad() {
           if(!this.bookSelected) {
               return
           }
            this.popupMenu = this.popup({
               title: this.isDownLoad ? this.$t('shelf.setDownloadSuccess') : this.$t('shelf.setDownloadTitle'),
               btn: [
                   {
                       text: this.isDownLoad ? this.$t('shelf.close') : this.$t('shelf.open'),
                       click: () => {
                           this.setDownLoad()
                       }
                   },
                   {
                       text: this.$t('shelf.cancel'),
                       click: () => {
                           this.hidePopup()
                       }
                   }
               ]
           }).show()
       },
       // 2.1 开启或关闭离线缓存
       async setDownLoad() {
           this.onComplete()
           if(this.isDownLoad) {
               this.removeSelectedBook()
           } else {
               await this.downloadSelectedBook()
           }
       },
       // 2.2 取消离线下载
       removeSelectedBook() {
           Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
           .then(books => {
               books.map(book => {
                   book.cache = false
               })
               saveBookShelf(this.shelfList)
               this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
           })
       },
       // 2.2.1 删除本地下载的电子书
       removeBook(book) {
           return new Promise((resolve, reject) => {
               removeLocalStorage(`${book.categoryText}/${book.fileName}-info`)
               removeLocalForage(`${book.fileName}`)
               resolve(book)
           })
       },
       // 2.3 离线下载电子书
       async downloadSelectedBook() {
           for(let i = 0; i < this.shelfSelected.length; i++) {
               await this.downloadBook(this.shelfSelected[i]).then(book => {
                   book.cache = true
               })
           }
           saveBookShelf(this.shelfList)
           this.simpleToast(this.$t('shelf.setDownloadSuccess'))
       },
       // 2.3.1 下载电子书
       downloadBook(book) {
           let text = ''
           const toast = this.toast({
               text
           })
           toast.continueShow()
           return new Promise((resolve, reject) => {
               download(book, book => {
                   toast.remove()
                   resolve(book)
               }, reject,  progressEvent => {
                   const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
                   const text = this.$t('shelf.progressDownload').replace('$1', `${book.fileName}.epub(${progress})`)
                   toast.updateText(text)
               })
           })
       },

       // 3. 移出书架
       showRemove() {
           if(!this.bookSelected) {
               return
           }
           let title
           if(this.shelfSelected.length === 1) {
               title = this.$t('shelf.removeBookTitle').replace('$1',`《${this.shelfSelected[0].title}》`)
           } else {
                title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
           }
           this.popupMenu = this.popup({
               title: title,
               btn: [
                   {
                       text: this.$t('shelf.removeBook'),
                       type: 'danger',
                       click: () => {
                           this.removeSelected()
                       }
                   },
                   {
                       text: this.$t('shelf.cancel'),
                       click: () => {
                           this.hidePopup()
                       }
                   }
               ]
           }).show()
       },
       // 3.1 移出书架
       removeSelected() {
           this.shelfSelected.forEach(selected => {
               this.setShelfList(this.shelfList.filter(book => book !== selected))
           })
           this.setShelfSelected([])
           this.onComplete()
       },

       //4. 移动到
       showDialog() {
           this.dialog().show()
       },

       // 完成操作之后 保存
       onComplete() {
           this.hidePopup()
           this.setIsEditMode(false)
           saveBookShelf(this.shelfList)
       },
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-footer {
        position: fixed;
        z-index: 3000;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0 px2rem(-2) px2rem(2) 0 rgba(100, 100, 100, .1);
        .shelf-footer-bar {
            opacity: .5;
            &.is-selected {
                opacity: 1;
            }
            .shelf-footer-text {
                font-size: px2rem(12);
            }
            .danger-color {
                color: rgb(255, 102, 159);
            }
        }
        
    }
</style>

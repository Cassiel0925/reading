<template>
    <transition name="fade">
        <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow': isHideShadow}">
            <!-- 清除缓存 -->
            <div class="shelf-title-btn-wrapper shelf-title-left"  @click="clear">
                <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
            </div>
            <!-- 书架 -->
            <div class="shelf-title-center">
                <span class="shelf-center-title" :class="{'edit-fontsize': isEditMode}">{{$t('shelf.title')}}</span> 
                <span class="shelf-sub-title" v-if="isEditMode">{{selectBookText}}</span>
            </div>
            <!-- 编辑 -->
            <div class="shelf-title-btn-wrapper shelf-title-right" @click="onEditClick">
                <span class="shelf-title-btn-text">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
            </div>
        </div>
    </transition>
</template>
<script>
import {storeShelfMixin} from 'utils/mixin'
import {clearLocalStorage} from 'utils/localStorage'
import {clearLocalForage} from 'utils/localForage'
export default {
   name:'ShelfTitle',
   components: {
   },
   mixins: [storeShelfMixin],
   data () {
       return {
           isHideShadow: true
       }
   },
   watch: {
       offsetY(v) {
           if(v > 0) {
               this.isHideShadow = false
           } else {
               this.isHideShadow = true
           }
       }
   },
   computed: {
       selectBookText() {
           const selectedNum = this.shelfSelected ? this.shelfSelected.length : 0
           if(selectedNum <= 0) {
               return this.$t('shelf.selectBook')
           } else if(selectedNum === 1) {
               return this.$t('shelf.haveSelectedBook').replace('$1', selectedNum)
           } else if(selectedNum > 1) {
               return this.$t('shelf.haveSelectedBooks').replace('$1', selectedNum)
           }
       }
   },
   methods: {
       // 1. 编辑和取消的点击
       onEditClick() {
           // 点击取消，将shelfSelected置为空,同时将shelfList数组里的selected置为false
           if(!this.isEditMode) {
               this.setShelfSelected([])
               this.shelfList.forEach(item => {
                   item.selected = false
                   if(item.itemList) {
                       item.itemList.forEach(subItem => {
                           subItem.selected = false
                       })
                   }
               })
           }
           this.setIsEditMode(!this.isEditMode)
       },
       // 清除缓存
       clear() {
           console.log('111');
        //    clearLocalStorage()
        //    clearLocalForage()
        //    this.setShelfList([])
        //    this.setShelfSelected([])
        //    this.getShelfList()
        //    this.simpleToast(this.$t('shelf.clearCacheSuccess'))
       },
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-title {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        z-index: 110;
        width: 100%;
        height: px2rem(42);
        background: #fff;
        color: #333;
        box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(100, 100, 100, .2);
        &.hide-shadow {
            box-shadow: none;
        }
        .shelf-title-center {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            @include columnCenter;
            .shelf-center-title {
                font-size: px2rem(18);
                font-weight: 700;
                &.edit-fontsize {
                    font-size: px2rem(16);
                }
            }
            .shelf-sub-title {
                font-size: px2rem(10);
                margin-top: px2rem(5);
            }
        }
        .shelf-title-btn-wrapper {
            position: absolute;
            top: 0;
            height: 100%;
            box-sizing: border-box;
            @include center;
            .shelf-title-btn-text {
                font-size: px2rem(14);
            }
            &.shelf-title-left {
                left: 0;
                margin-left: px2rem(10);
            }
            &.shelf-title-right {
                right: 0;
                margin-right: px2rem(10);
            }
        }
        
    }
</style>

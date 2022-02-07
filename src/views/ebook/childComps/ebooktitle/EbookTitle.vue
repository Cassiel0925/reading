<template>
    <transition name="slide-down">
        <div class="ebook-title" v-show="isTitleAndFooterVisible">
            <div class="ebook-title-left-wrapper">
                <!-- 返回 -->
                <div class="title-left-icon" @click="back">
                    <span class="icon-back"></span>
                </div>
            </div>
            <div class="ebook-title-right-wrapper">
                <!-- 书架 -->
                <div class="right-icon" @click="goToShelf">
                    <span class="icon-shelf"></span>
                </div>
                <!-- 购物车 -->
                <div class="right-icon">
                    <span class="icon-cart"></span>
                </div>
                <!-- 更多 -->
                <div class="right-icon">
                    <span class="icon-more"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {storeEbookMixin} from 'utils/mixin'
export default {
   name:'EbookTitle',
   mixins: [storeEbookMixin],
   methods: {
       back() {
           this.setEbookPage(false)
           this.$router.go(-1)
       },
       goToShelf() {
           this.setEbookPage(false)
           this.$router.push('/shelf')
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .ebook-title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(45);
        box-shadow: 0 px2rem(6) px2rem(4) 0 rgba(100, 100, 100, .2);
        background: #fff;
        box-sizing: border-box;
        display: flex;
        font-size: px2rem(22);
        z-index: 100;
        .ebook-title-left-wrapper {
            flex: 0 0 px2rem(60);
            @include center;
        }
        .ebook-title-right-wrapper {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .right-icon {
                flex: 0 0 px2rem(40);
                @include center;
            }   
            
        }
    }
</style>

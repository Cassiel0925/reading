<template>
    <div class="main-tab-bar" v-show="!isEditMode && !ebookPage && !loginPage">
        <tab-bar class="main-bar">
            <tab-bar-item path="/home">
                <i slot="item-icon" class="icon-home"></i>
                <i slot="item-icon-active" class="icon-home" style="color: rgb(74, 171, 255)"></i>
                <div slot="item-text">{{$t('home.title')}}</div>
            </tab-bar-item>
            <tab-bar-item path="/category">
                <i slot="item-icon" class="icon-storage"></i>
                <i slot="item-icon-active" class="icon-storage" style="color: rgb(74, 171, 255)"></i>
                <div slot="item-text">{{$t('home.category')}}</div>
            </tab-bar-item>
            <tab-bar-item path="/shelf">
                <i class="icon-shelf" slot="item-icon"></i>
                <i class="icon-shelf" slot="item-icon-active" style="color: rgb(74, 171, 255)"></i>
                <div slot="item-text">{{$t('shelf.title')}}</div>
            </tab-bar-item>
            <tab-bar-item path="/profile">
                <i class="icon-person" slot="item-icon"></i>
                <i class="icon-person" slot="item-icon-active" style="color: rgb(74, 171, 255)"></i>
                <div slot="item-text">{{$t('login.me')}}</div>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
import {storeShelfMixin, storeLoginMixin} from 'utils/mixin'
export default {
   name:'MainTabBar',
   components: { 
       TabBar,
       TabBarItem,
    },
    mixins: [storeShelfMixin, storeLoginMixin]

}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .main-tab-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 px2rem(-2) px2rem(2) 0 rgba(100, 100, 100, .1);
        .main-bar {
        }
    }
</style>

<template>
    <div class="ebook-footer">
        <transition name="slide-up">
            <div class="ebook-footer-bar" 
                 v-show="isTitleAndFooterVisible">
                <tab-bar class="ebook-footer-tab-bar"
                         :class="{'no-shadow': !isTitleAndFooterVisible || settingVisible !== -1}">
                    <!-- 目录 -->
                    <tab-bar-item class="ebook-footer-tab-bar-item" @tabClick="settingShow(3)">
                        <div slot="item-icon" class="icon-menu"></div>
                    </tab-bar-item>
                    <!-- 进度 -->
                    <tab-bar-item class="ebook-footer-tab-bar-item" @tabClick="settingShow(2)">
                        <div slot="item-icon" class="icon-progress"></div>
                    </tab-bar-item>
                    <!-- 亮度 -->
                    <tab-bar-item class="ebook-footer-tab-bar-item" @tabClick="settingShow(1)">
                        <div slot="item-icon" class="icon-bright"></div>
                    </tab-bar-item>
                    <!-- 字体 -->
                    <tab-bar-item class="ebook-footer-tab-bar-item" @tabClick="settingShow(0)">
                        <div slot="item-icon" class="icon-A"></div>
                    </tab-bar-item>
                </tab-bar>
            </div>
        </transition>

        <transition name="slide-up">
            <div class="setting-wrapper" v-show="isTitleAndFooterVisible && settingVisible !== -1">
                <setting-font-size v-show="isTitleAndFooterVisible && settingVisible === 0"/>
                <setting-theme v-show="isTitleAndFooterVisible && settingVisible === 1"/>
                <seeting-progress v-show="isTitleAndFooterVisible && settingVisible === 2"/>
            </div>
        </transition>
        <font-family-popup/>
        <ebook-slide v-show="isTitleAndFooterVisible && settingVisible === 3"/>
    </div>
</template> 
<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
import {storeEbookMixin} from 'utils/mixin'
import SettingFontSize from './childComps/SettingFontSize.vue'
import FontFamilyPopup from './childComps/FontFamilyPopup.vue'
import SettingTheme from './childComps/SettingTheme.vue'
import SeetingProgress from './childComps/SeetingProgress.vue'
import EbookSlide from './childComps/EbookSlide.vue'

export default {
   name:'EbookFooter',
   components: { 
       TabBar, 
       TabBarItem,
      SettingFontSize,
      FontFamilyPopup,
      SettingTheme ,
      SeetingProgress,
      EbookSlide
    },
   mixins: [storeEbookMixin],
   methods: {
       settingShow(key) {
           this.setSettingVisible(key)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .ebook-footer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(49);
        z-index: 100;
        .ebook-footer-tab-bar {
            box-shadow: 0 px2rem(-6) px2rem(4) rgba(100, 100, 100, .15);
            &.no-shadow {
                box-shadow: none;
            }
            .ebook-footer-tab-bar-item {
                @include center;
            }
        }
    }
    .setting-wrapper {
        position: absolute;
        bottom: px2rem(49);
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(90);
        box-shadow: 0 px2rem(-6) px2rem(4) rgba(100, 100, 100, .15);
        background: #fff;
        z-index: 100;
    }
</style>

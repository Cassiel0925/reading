<template>
    <transition name="popup-slide-up">
        <div class="font-family-popup" v-show="fontFamilyVisible">
            <div class="font-family-popup-title-wrapper">
                <div class="title-icon" @click="hide">
                    <span class="icon-down2"></span>
                </div>
                <div class="title-text">
                    <span class="text">{{$t('book.selectFont')}}</span>
                </div>
            </div>
            <div class="font-family-popup-list"
                 :class="{'is-select': defaultFontFamily === item.font}"
                 v-for="(item, index) in fontFamily"
                 :key="index"
                 @click="selectFontFamily(item.font)">
                <div class="item-text">
                    {{item.font}}
                </div>
                <div class="item-icon" v-if="defaultFontFamily === item.font">
                    <span class="icon-check"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {storeEbookMixin} from 'utils/mixin'
import { FONT_FAMILY } from 'utils/book'
import {saveFontFamily} from 'utils/localStorage'
export default {
   name:'FontFamilyPopup',
   mixins: [storeEbookMixin],
   data () {
       return {
           fontFamily: FONT_FAMILY
       }
   },
   methods: {
       selectFontFamily(font) {
           this.setDefaultFontFamily(font)
           saveFontFamily(this.fileName, font)
           if(font === 'Default') {
                this.currentBook.rendition.themes.font('Times New Roman')
            } else {
                this.currentBook.rendition.themes.font(font)
            }
       },
       hide() {
           this.setFontFamilyVisible(false)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .font-family-popup {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0 px2rem(-6) px2rem(3) rgba(0, 0 , 0, .3);
        z-index: 120;
        .font-family-popup-title-wrapper {
            position: relative;
            padding: px2rem(15);
            box-sizing: border-box;
            border-bottom: px2rem(1) solid #eee;
            text-align: center;
            .title-icon {
                position: absolute;
                left: px2rem(15);
                height: 100%;
                font-size: px2rem(16);
                font-weight: 700;
            }
            .title-text {
                font-size: px2rem(14);
                font-weight: 700;
            }
        }
        .font-family-popup-list {
            font-size: px2rem(16);
            display: flex;
            padding: px2rem(8);
            box-sizing: border-box;
            &.is-select {
                color: rgb(74, 171, 255);
                font-weight: 700;
            }
            .item-text {
                flex: 1;
                text-align: left;
            }
            .item-icon {
                flex: 1;
                text-align: right;
            }
        }
    }
</style>

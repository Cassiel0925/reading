<template>
    <div class="setting-font-size">
        <!-- 字体大小设置 -->
        <div class="setting-font-size-wrapper">
            <div class="preview" :style="{fontSize: firstFontSize}">A</div>
            <div class="select">
                <div class="select-wrapper"
                     v-for="(item, index) in fontSizeList"
                     :key="index"
                     @click="setFontSize(item.fontSize)">
                    <div class="line"></div>
                    <div class="point-wrapper">
                        <div class="point" v-show="defaultFontSize === item.fontSize">
                            <div class="small-point"></div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="preview" :style="{fontSize: lastFontSize}">A</div>
        </div>
        <!-- 字体设置 -->
        <div class="setting-font-family">
            <setting-font-family></setting-font-family>
        </div>
    </div>
</template>
<script>
import {FONT_SIZE_LIST} from 'utils/book'
import {storeEbookMixin} from 'utils/mixin'
import {saveFontSize} from 'utils/localStorage'
import SettingFontFamily from './SettingFontFamily.vue'
export default {
   name:'SettingFontSize',
   components: { 
       SettingFontFamily 
    },
   mixins: [storeEbookMixin],
   data () {
       return {
           fontSizeList: FONT_SIZE_LIST
       }
   },
   computed: {
       firstFontSize() {
           return this.fontSizeList[0].fontSize + 'px'
       },
       lastFontSize() {
           return this.fontSizeList[this.fontSizeList.length - 1].fontSize + 'px'
       }
   },
   methods: {
       setFontSize(fontSize) {
           this.setDefaultFontSize(fontSize)
           saveFontSize(this.fileName, fontSize)
           this.currentBook.rendition.themes.fontSize(fontSize)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .setting-font-size {
        display: flex;
        flex-direction: column;
        height: px2rem(90);
        .setting-font-size-wrapper {
            display: flex;
            flex: 2;
            height: 100%;
            .preview {
                flex: 0 0 px2rem(40);
                @include center;
            }
            .select {
                flex: 1;
                display: flex;
                .select-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    &:first-child {
                        .line {
                            &:first-child {
                                border: none;
                            }
                        }
                    }
                    &:last-child {
                        .line {
                            &:last-child {
                                border: none;
                            }
                        }
                    }
                    .line {
                        flex: 1;
                        height: 0;
                        border-top: px2rem(1) solid #ccc;
                    }
                    .point-wrapper {
                        position: relative;
                        height: px2rem(7);
                        border-left: px2rem(1) solid #ccc;
                        .point {
                            position: absolute;
                            top: px2rem(-8);
                            left: px2rem(-12);
                            width: px2rem(22);
                            height: px2rem(22);
                            border-radius: 50%;
                            border: px2rem(1) solid #ccc;
                            @include center;
                            .small-point {
                                width: px2rem(5);
                                height: px2rem(5);
                                background: #000;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }
        }
        .setting-font-family {
            flex: 1;
        }
    }
</style>

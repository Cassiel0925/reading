<template>
    <div class="setting-theme">
        <div class="setting-theme-item"
             v-for="(item, index) in themeList"
             :key="index">
            <div class="preview"
                 :style="{background: item.style.body.background}"
                 :class="{'selected': defaultTheme === item.name}"
                 @click="setTheme(index)"></div>
            <div class="text" :class="{'selected': defaultTheme === item.name}">{{item.alias}}</div>
        </div>
    </div>
</template>
<script>
import {storeEbookMixin} from 'utils/mixin'
import {saveTheme} from 'utils/localStorage'
export default {
   name:'SettingTheme',
   mixins: [storeEbookMixin],
   methods: {
       setTheme(index) {
           const theme = this.themeList[index]
           this.setDefaultTheme(theme.name).then(() => {
               this.currentBook.rendition.themes.select(this.defaultTheme)
               this.initGlobalStyle()
           })
           saveTheme(this.fileName, theme.name)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .setting-theme {
        height: 100%;
        display: flex;
        .setting-theme-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: px2rem(5);
            .preview {
                flex: 1;
                border: px2rem(1) solid #ccc;
                box-sizing: border-box;
                &.selected {
                    box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .1);
                }
            }
            .text {
                flex: 0 0 px2rem(20);
                font-size: px2rem(14);
                text-align: center;
                padding-top: px2rem(3);
                color: #ccc;
                &.selected {
                    color: #000;
                }
            }
        }
    }
</style>

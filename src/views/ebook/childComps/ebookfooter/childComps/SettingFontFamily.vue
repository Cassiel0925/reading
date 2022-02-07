<template>
    <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text">
            <span class="text">{{defaultFontFamily}}</span>
        </div>
        <div class="setting-font-family-icon">
            <span class="icon-forward"></span>
        </div>
    </div>
</template>
<script>
import {storeEbookMixin} from 'utils/mixin'
export default {
   name:'SettingFontFamily',
   mixins: [storeEbookMixin],
   methods: {
       showFontFamilyPopup() {
           this.setFontFamilyVisible(true)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .setting-font-family {
        @include center;
        font-size: px2rem(14);
        .setting-font-family-text {
            @include center;
        }
        .setting-font-family-icon {
            @include center;
        }
    }
</style>

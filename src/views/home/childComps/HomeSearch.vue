<template>
    <div class="home-search" :class="{'hide-shadow': isHideShadow}">
        <!-- back -->
        <div class="home-search-back" v-show="isShowBack"  @click="back()">
            <span class="icon-back"></span>
        </div>
        <div class="home-search-input-wrapper" 
             :class="{'back-show': isShowBack}">
            <!-- icon -->
            <div class="home-search-icon-wrapper">
                <span class="icon-search"></span>
            </div>
            <!-- input -->
            <div class="home-search-input-text-wrapper" @click="showHotSearch()">
                <input type="text" 
                       :placeholder="$t('home.hint')"
                       v-model="searchText"
                       @keyup.13.exact="search">
            </div>
        </div>

        
    </div>
</template>
<script>
import {storeHomeMixin} from 'utils/mixin'
export default {
   name:'HomeSearch',
   mixins: [storeHomeMixin],
   data () {
       return {
           isShowBack: false,
           isHideShadow: true,
           searchText: ''
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

   },
   methods: {
       showHotSearch() {
           this.$emit('showHotSearch')
           this.isShowBack = true
       },
       back() {
           this.$emit('back')
           this.isShowBack = false
           this.searchText = ''
       },
       search() {
           this.$router.push({
               path: '/list',
               query: {
                   keyword: this.searchText
               }
           }).then(this.searchText = '')
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .home-search {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(52);
        background: #fff;
        @include center;
        display: flex;
        box-shadow: 0 px2rem(1) px2rem(1) rgba(100, 100, 100, .1);
        &.hide-shadow {
            box-shadow: none;
        }
        .home-search-back {
            flex: 0 0 px2rem(33);
            font-size: px2rem(18);
            color: #666;
            @include center;
        }
        .home-search-input-wrapper {
            flex: 1;
            width: 100%;
            display: flex;
            border: px2rem(1) solid #ccc;
            border-radius: px2rem(26);
            margin: 0 px2rem(15);
            padding: px2rem(5) 0 px2rem(5) px2rem(3); 
            box-sizing: border-box;
            background: #f4f4f4;
            @include center;
            &.back-show {
                margin-left: px2rem(8)
            }
            .home-search-icon-wrapper {
                flex: 0 0 px2rem(25);
                @include right;
                font-size: px2rem(16);
                color: #ccc;
            }
            .home-search-input-text-wrapper {
                flex: 1;
                padding-left: px2rem(5);
                box-sizing: border-box;
                @include left;
                input {
                    width: 100%;
                    height: px2rem(22);
                    background: transparent;
                    outline: none;
                    border: none;
                    font-size: px2rem(13);
                    color: #666;
                    &::-webkit-input-placeholder {
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>

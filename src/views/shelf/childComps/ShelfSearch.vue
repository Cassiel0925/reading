<template>
    <div class="shelf-search-wrapper" 
         :class="{'search-top': isInputClicked, 'hide-shadow': isHideShadow}">
        <!-- search -->
        <div class="shelf-search" :class="{'search-top': isInputClicked}">
            <!-- search-input -->
            <div class="shelf-search-input-wrapper">
                <div class="shelf-search-input">
                    <!-- icon-search -->
                    <div class="input-icon-wrapper">
                        <span class="icon-search"></span>
                    </div>
                    <!-- input -->
                    <input  class="input" 
                            type="text"
                            :placeholder="$t('shelf.search')"
                            v-model="searchText"
                            @click="onSearchClick">
                    <!-- icon-clear -->
                    <div class="input-icon-clear-wrapper" 
                         v-show="searchText.length > 0"
                         @click="clearSearchText">
                        <span class="icon-close-circle-fill"></span>
                    </div>
                </div>
            </div>
            <!-- icon/cancel -->
            <div class="shelf-search-btn-wrapper">
                <!-- 语言切换按钮 -->
                <div class="lang-btn-icon" @click="changeLocale" v-if="!isInputClicked">
                    <span class="icon-cn" v-if="lang === 'cn'"></span>
                    <span class="icon-en" v-else></span>
                </div>
                <!-- 取消按钮 -->
                <div class="cancel-btn-text" v-else @click="onCancelClick">
                    <span class="btn-text">{{$t('shelf.cancel')}}</span>
                </div>
            </div>
        </div>
        <transition name="hot-search-move">
            <!-- tab -->
            <div class="shelf-search-tab-wrapper" v-if="isInputClicked">
                <div class="shelf-search-tab"
                    v-for="item in tab"
                    :key="item.id"
                    @click="tabClick(item.id)">
                    <div class="tab-text" :class="{'is-selected': item.id === selectedTab}">{{item.text}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import {setLocalStorage} from 'utils/localStorage'
import {storeShelfMixin} from 'utils/mixin'
export default {
   name:'ShelfSearch',
   mixins: [storeShelfMixin],
   data () {
       return {
           searchText: '',
           isInputClicked: false,
           selectedTab: 1,
           isHideShadow: true
       }
   },
   watch: {
       offsetY(v) {
           if(v > 0 && this.isInputClicked) {
               this.isHideShadow = false
           } else {
               this.isHideShadow = true
           }
       }
   },
   computed: {
       lang() {
           return this.$i18n.locale;
       },
        // tab 数组
       tab() {
           return [
               {
                   id: 1,
                   text: this.$t(`shelf.default`)
               },
               {
                   id: 2,
                   text: this.$t(`shelf.progress`)
               },
               {
                   id: 3,
                   text: this.$t(`shelf.purchase`)
               }
           ]
       }
   },
   methods: {
       // 点击删除icon 将input中的内容清除
       clearSearchText() {
           this.searchText = ''
       },
       // 语言切换
       changeLocale() {
           if(this.lang === 'cn') {
               this.$i18n.locale = 'en'
           } else {
               this.$i18n.locale = 'cn'
           }
           setLocalStorage('locale', this.$i18n.locale)
       },
       // 点击搜索框实现上移
       onSearchClick() {
           this.isInputClicked = true
           this.setShelfTitleVisible(false)
       },
       // 点击取消
       onCancelClick() {
           this.isInputClicked = false
           this.setShelfTitleVisible(true)
       },
       // tab切换
       tabClick(index) {
           this.selectedTab = index
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-search-wrapper {
        position: relative;
        z-index: 105;
        width: 100%;
        height: px2rem(94);
        background: #fff;
        display: flex;
        box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(100, 100, 100, .2);
        &.search-top {
            position: fixed;
            top: 0;
            left: 0;
        }
        &.hide-shadow {
            box-shadow: none;
        }
        .shelf-search {
            position: absolute;
            top: px2rem(42);
            left: 0;
            width: 100%;
            height: px2rem(52);
            background: #fff;
            display: flex;
            transition: top .2s linear;
            &.search-top {
                top: 0;
            }
            .shelf-search-input-wrapper {
                flex: 1;
                padding: px2rem(8) 0 px2rem(10) px2rem(10);
                box-sizing: border-box;
                .shelf-search-input {
                    display: flex;
                    width: 100%;
                    border: px2rem(1) solid #ccc;
                    padding: px2rem(8) px2rem(10);
                    box-sizing: border-box;
                    border-radius: px2rem(5);
                    .input-icon-wrapper {
                        flex: 0 0 px2rem(22);
                        font-size: px2rem(16);
                        @include right;
                    }
                    .input {
                        flex: 1;
                        outline: none;
                        border: none;
                        font-size: px2rem(14);
                        color: #333;
                        margin-left: px2rem(5);
                        box-sizing: border-box;
                        @include center;
                        :-webkit-input-placeholder {
                            color: #ccc;
                        }
                    }
                    .input-icon-clear-wrapper {
                        flex: 0 0 px2rem(22);
                        font-size: px2rem(14);
                        color: #999;
                        @include center;
                    }
                }
            }
            .shelf-search-btn-wrapper {
                flex: 0 0 px2rem(55);
                @include center;
                .lang-btn-icon {
                    font-size: px2rem(22);
                }
                .cancel-btn-text {
                    font-size: px2rem(14);
                    color: rgb(74, 171, 255);
                }
            }
        }
        .shelf-search-tab-wrapper {
            position: absolute;
            top: px2rem(52);
            left: 0;
            right: 0;
            width: 100%;
            height: px2rem(42);
            display: flex;
            .shelf-search-tab {
                flex: 1;
                @include center;
                .tab-text {
                    font-size: px2rem(12);
                    color: #999;
                    &.is-selected {
                        color: rgb(74, 171, 255);
                        font-weight: 700;
                    }
                }
            }
        }
            
    }
</style>

<template>
    <div class="categories-item">
        <scroll :top="42"
                :bottom="49"
                @onScroll="onScroll">
            <div class="categories-list-wrapper">
                <div class="categories-list-item"
                     v-for="(item, index) in categories"
                     :key="index"
                     @click="showBookCategory(item)">
                     <div class="category-wrapper">
                        <!-- info -->
                        <div class="item-info-wrapper">
                            <div class="info-title title-medium">{{categoryText(item.id)}}</div>
                            <div class="info-num sub-title-tiny">{{$t('home.allBook').replace('$1', item.num)}}</div>
                        </div>
                        <!-- img -->
                        <div class="item-img-wrapper">
                            <div class="img-group">
                                <img class="img1" :src="item.img1">
                                <img class="img2" :src="item.img2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import {categoryText, getCategoryName} from 'utils/store'
import {storeShelfMixin} from 'utils/mixin'
export default {
   name:'CategoriesItem',
   components: { 
       Scroll 
    },
   props: {
       categories: Array
   },
   mixins: [storeShelfMixin],
   methods: {
       categoryText(index) {
           return categoryText(index, this)
       },
       showBookCategory(item) {
           this.$router.push({
               path: '/list',
               query: {
                   category: getCategoryName(item.id),
                   categoryText: this.categoryText(item.id)
               }
           })
       },
       onScroll(offsetY) {
           this.setOffsetY(offsetY)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .categories-item {
        .categories-list-wrapper {
            display: flex;
            flex-flow: row wrap;
            width: 100%;
            margin: px2rem(5) 0  px2rem(15) 0;
            .categories-list-item {
                flex: 0 0 50%;
                width: 50%;
                padding: 0 px2rem(5) px2rem(10) px2rem(5);
                box-sizing: border-box;
                &:nth-child(odd) {
                    padding-left: px2rem(10);
                }
                &:nth-child(even) {
                    padding-right: px2rem(10);
                }
                .category-wrapper {
                    display: flex;
                    width: 100%;
                    background: #eee;
                    .item-info-wrapper {
                        flex: 0 0 50%;
                        width: 50%;
                        @include columnCenter;
                        .info-title {
                            text-align: center;
                        }
                        .info-num {
                            text-align: center;
                            margin-top: px2rem(15);
                        }
                    }
                    .item-img-wrapper {
                        flex: 0 0 50%;
                        width: 50%;
                        padding: px2rem(20) px2rem(10);
                        box-sizing: border-box;
                        .img-group {
                            position: relative;
                            width: 100%;
                            height: px2rem(60);
                            @include left;
                            .img1 {
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 100;
                                width: px2rem(45);
                                height: px2rem(60);
                            }
                            .img2 {
                                position: absolute;
                                left: px2rem(30);
                                top: px2rem(7.5);
                                z-index: 99;
                                width: px2rem(30);
                                height: px2rem(45);
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>

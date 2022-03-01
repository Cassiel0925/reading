<template>
    <div class="featured">
        <title-bar :leftItem="titleText"
                   v-if="featured && featured.length > 0"/>
        <div class="featured-list-wrapper">
            <div class="featured-list-item"
                 v-for="(item, index) in featured"
                 :key="index"
                 @click="showBookDetail(item)">
                <div class="featured-item-img">
                    <img :src="item.cover" alt="">
                </div>
                <div class="featured-item-content">
                    <div class="featured-content-title title-small">{{item.title}}</div>
                    <div class="featured-content-author sub-title-tiny">{{item.author}}</div>
                    <div class="featured-content-categorytext third-title-tiny">{{categoryText(item.category)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TitleBar from 'components/common/titlebar/TitleBar.vue'
import {categoryText} from 'utils/store'
import {storeHomeMixin} from 'utils/mixin'
export default {
   name:'Featured',
   components: {
       TitleBar,
   },
   mixins: [storeHomeMixin],
  props: {
      titleText: String,
      btnText: String,
       featured: Array
   },
   methods: {
       categoryText(index) {
           return categoryText(index, this)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .featured {
        .featured-list-wrapper {
            display: flex;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            .featured-list-item {
                flex: 0 0 50%;
                width: 50%;
                display: flex;
                padding: px2rem(5) px2rem(5) px2rem(10) 0;
                box-sizing: border-box;
                .featured-item-img {
                    flex: 0 0 30%;
                    width: 30%;
                    img {
                        width: 100%;
                    }
                }
                .featured-item-content {
                    flex: 1;
                    width: 70%;
                    box-sizing: border-box;
                    padding: 0 px2rem(5);
                    .featured-content-title {
                        display: block;
                        width: 100%;
                        @include ellipsis;
                    }
                    .featured-content-author {
                        margin-top: px2rem(10);
                    }
                    .featured-content-categorytext {
                        margin-top: px2rem(8);
                    }
                }
            }
        }
    }
</style>

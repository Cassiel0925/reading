<template>
    <div class="guess-you-like">
        <!-- title -->
        <title-bar :leftItem="$t('home.guessYouLike')"
                   :rightItem="$t('home.change')"
                   @itemClick="change"/>
        <div class="guess-you-like-list">
            <div class="guess-you-like-item"
                 v-for="(item, index) in showData"
                 :key="index"
                 @click="showBookDetail(item)">
                <!-- 封面 -->
                <div class="item-img">
                    <img :src="item.cover" alt="">
                </div>
                <!-- 信息 -->
                <div class="content-wrapper">
                    <div class="content-title title-big">{{item.title}}</div>
                    <div class="content-author sub-title">{{item.author}}</div>
                    <div class="content-other-info third-title">{{otherInfo(item)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TitleBar from 'components/common/titlebar/TitleBar.vue'
import {storeHomeMixin} from 'utils/mixin'
export default {
   name:'GuessYouLike',
   components: { 
       TitleBar 
    },
   props: {
       guessYouLike: Array
   },
   mixins: [storeHomeMixin],
   data () {
       return {
           index: 0,
           total: 0
       }
   },
   watch: {
       guessYouLike(v) {
           this.total = v.length / 3
       }
   },
   computed: {
       showData() {
           if(this.guessYouLike) {
                return [
                    this.guessYouLike[this.index],
                    this.guessYouLike[this.index + this.total],
                    this.guessYouLike[this.index + this.total * 2]
                ]
           } else {
               return []
           }
           
       },
       
   },
   methods: {
       change() {
           if(this.index + 1 >=this.total) {
               this.index = 0
           } else {
               this.index++
           }
       },
       otherInfo(item) {
           if(item && item.type && item.result) {
               switch (item.type) {
                    case 1:
                        return this.$t('home.sameAuthor').replace('$1', item.result)
                    case 2:
                        return this.$t('home.sameReader').replace('$1', item.result)
                    case 3:
                        return this.$t('home.readPercent').replace('$1', item.percent).replace('$2', item.result)
                }
           }
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .guess-you-like {
        .guess-you-like-list {
            width: 100%;
            padding: px2rem(10) px2rem(10) px2rem(5) px2rem(10);
            box-sizing: border-box;
            .guess-you-like-item {
                display: flex;
                margin-bottom: px2rem(15);
                .item-img {
                    flex: 0 0 20%;
                    img {
                        width: 100%;
                    }
                }
                .content-wrapper {
                    flex: 1;
                    padding-left: px2rem(10);
                    box-sizing: border-box;
                    .content-title {
                        color: #333;
                    }
                    .content-author {
                        margin-top: px2rem(20);
                    }
                    .content-other-info {
                        margin-top: px2rem(8);
                    }
                }
            }
        }
    }
</style>

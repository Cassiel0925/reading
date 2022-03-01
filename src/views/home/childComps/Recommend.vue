<template>
    <div class="recommend">
        <title-bar :leftItem="$t('home.recommend')"/>
        <!-- list -->
        <div class="recommend-list-wrapper">
            <div class="recommend-list-item"
                 v-for="(item, index) in recommend"
                 :key="index"
                 @click="showBookDetail(item)">
                <div class="recommend-img">
                    <img :src="item.cover" alt="">
                </div>
                <div class="recommend-content-wrapper">
                    <div class="recommend-title title-medium">{{item.title}}</div>
                    <div class="recommend-info sub-title">{{readersText(item)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TitleBar from 'components/common/titlebar/TitleBar.vue'
import {storeHomeMixin} from 'utils/mixin'
export default {
   name:'Recommend',
   components: { 
       TitleBar 
    },
    mixins: [storeHomeMixin],
    props: {
        recommend: Array
    },
    methods: {
        readersText(item) {
            return this.$t('home.readers').replace('$1', item.readers)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .recommend {
        .recommend-list-wrapper {
            display: flex;
            margin-bottom: px2rem(20);
            .recommend-list-item {
                flex: 0 0 33.33%;
                width: 33.33%;
                padding: 0 px2rem(15);
                box-sizing: border-box;
                .recommend-img {
                    width: 100%;
                    height: px2rem(140);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .recommend-content-wrapper {
                    @include columnCenter;
                    .recommend-title {
                        display: block;
                        width: 100%;
                        text-align: center;
                        margin-top: px2rem(8);
                        @include ellipsis;
                    }
                    .recommend-info {
                        margin-top: px2rem(5);
                    }
                }
            }
        }
    }
</style>

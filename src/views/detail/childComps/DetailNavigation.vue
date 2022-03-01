<template>
    <div class="detail-navigation">
        <div class="detail-navigation-title">{{$t('detail.navigation')}}</div>
        <div class="detail-navigation-content-wrapper">
            <div class="loading-text-wrapper" v-if="!navigation">
                <span class="loading-text">{{$t(`detail.loading`)}}</span>
            </div>
            <div class="detail-navigation-content"
                v-for="(item, index) in showData"
                :key="index"
                v-else>
                <div class="content-item-text"
                     :style="itemStyle(item)">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {px2rem} from 'utils/utils'
export default {
   name:'DetailNavigation',
   props: {
       navigation: Object,
       flatNavigation: Array
   },
   methods: {
       // 电子书目录缩进样式
      itemStyle(item) {
        return {
          marginLeft: (item.deep - 1) * px2rem(20) + 'rem'
        }
      },
   },
   computed: {
       showData() {
           if(this.flatNavigation.length > 20) {
               let ell = [
                   {
                       deep: 1,
                       label: '... ...',
                   }
               ]
               return this.flatNavigation.slice(0,20).concat(ell)
           } else {
               return this.flatNavigation
           }
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .detail-navigation {
        width: 100%;
        padding: px2rem(20) px2rem(15) px2rem(15) px2rem(15);
        box-sizing: border-box;
        border-bottom: px2rem(1) solid #eee;
        .detail-navigation-title {
            font-size: px2rem(20);
            font-weight: 700;
            color: #333;
            margin-bottom: px2rem(20);
        }
        .detail-navigation-content-wrapper {
            font-size: px2rem(14);
            line-height: px2rem(16);
            color: #666;
            .detail-navigation-content {
                padding: px2rem(15) 0;
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #eee;
                .content-item-text {
                    width: 100%;
                    @include ellipsis;
                }
            }
            
        }
    }
</style>

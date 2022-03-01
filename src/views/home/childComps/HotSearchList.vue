<template>
  <div class="hot-search-list">
    <scroll :top="52"
            :bottom="52"
            @onScroll="onScroll"
            ref="scroll">
      <!-- hotSearch -->
      <hot-search :label="$t('home.hotSearch')"
                  :btn="$t('home.change')"
                  :hotSearchList="searchList.hotSearch"/>
      <!-- line -->
      <div class="line"></div>
      <!-- historySearch -->
      <hot-search :label="$t('home.historySearch')"
                  :btn="$t('home.clear')"
                  :hotSearchList="searchList.historySearch"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import HotSearch from './HotSearch.vue'
import {storeHomeMixin} from 'utils/mixin'
export default {
    name: 'HotSearchList',
    components: { 
        HotSearch,
        Scroll 
    },
    mixins: [storeHomeMixin],
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: '目送',
              num: '1.8万'
            },
            {
              type: 1,
              text: '匆匆那年',
              num: '1.1万'
            },
            {
              type: 1,
              text: '邓小平时代',
              num: '1.3万'
            },
            {
              type: 1,
              text: '少有人走的路',
              num: '1.0万'
            },
            {
              type: 1,
              text: '明宫奇案',
              num: '3.9万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: '鼠疫'
            },
            {
              type: 2,
              text: '日瓦格医生'
            },
            {
              type: 2,
              text: 'ePub'
            },
            {
              type: 2,
              text: 'api'
            },
            {
              type: 2,
              text: 'Vue.js'
            },
            {
              type: 2,
              text: 'Nginx'
            },
            {
              type: 2,
              text: 'Java'
            },
            {
              type: 2,
              text: 'hdfs'
            },
            {
              type: 2,
              text: 'vuejs'
            },
            {
              type: 2,
              text: 'es6'
            },
            {
              type: 2,
              text: 'Intel'
            },
            {
              type: 2,
              text: 'Pro Git'
            },
            {
              type: 2,
              text: 'imooc'
            },
            {
              type: 2,
              text: 'Education'
            },
            {
              type: 2,
              text: 'Springer'
            },
            {
              type: 2,
              text: 'Environment'
            }
          ]
        }
      }
    },
    methods: {
      onScroll() {
        this.$emit('hotSearchScroll')
      },
      scrollRefresh() {
        this.$refs.scroll.scrollTo(0,0)
      }
    }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
  .hot-search-list {
    width: 100%;
    height: 100%;
    background: #fff;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      box-sizing: border-box;
    }
  }
</style>
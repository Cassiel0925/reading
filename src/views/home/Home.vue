<template>
   <div class="home">
      <!-- 导航栏部分 -->
      <transition name="title-move">
         <nav-bar v-show="titleVisible">
            <div class="home-bar-center" slot="center">{{$t('home.title')}}</div>
            <!-- <div class="home-bar-right icon-shake" slot="right"></div> -->
         </nav-bar>
      </transition>
      <!-- 搜索区域 -->
      <home-search @showHotSearch="showHotSearch"
                   @back="back"/>

      <!-- hotSearch -->
      <hot-search-list v-show="hotSearchVisible"
                       @hotSearchScroll="hotSearchScroll"
                       ref="hotSearchList"/>
      
      <!-- 滚动区域 -->
      <scroll :top="scrollTop"
              :bottom="52"
              @onScroll="onScroll"
              ref="scroll">
         <!-- banner -->
         <home-swiper :banners="banners"></home-swiper>
         <!-- <div class="banner-wrapper">
            <div class="banner-img" :style="{backgroundImage: `url('${banner[0]}')`}"></div>
         </div> -->
         <!-- GuessYouLike -->
         <guess-you-like :guessYouLike="guessYouLike"/>
         <!-- recommend -->
         <recommend :recommend="recommend"/>
         <!-- featured -->
         <featured :titleText="$t('home.featured')"
                   :btnText="$t('home.seeAll')"
                   :featured="featured"/>
         <!-- categoryList -->
         <category-list :categoryList="categoryList"/>
      </scroll>
   </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import HomeSearch from './childComps/HomeSearch.vue'
import GuessYouLike from './childComps/GuessYouLike.vue'
import Recommend from './childComps/Recommend.vue'
import Featured from './childComps/Featured.vue'
import CategoryList from './childComps/CategoryList.vue'
import HotSearchList from './childComps/HotSearchList.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'

import {home} from 'network/index'
import {storeHomeMixin} from 'utils/mixin'
export default {
   name:'Home',
   components: { 
      NavBar,
      HomeSearch,
      Scroll,
      GuessYouLike,
      Recommend ,
      Featured,
      CategoryList,
      HotSearchList,
      HomeSwiper 
   },
   mixins: [storeHomeMixin],
   data () {
      return {
         scrollTop: 94,
         banners: [],
         guessYouLike: [],
         recommend: [],
         featured: [],
         categoryList: [],
         titleVisible: true,
         hotSearchVisible: false,
         saveY: 0
      }
   },
   methods: {
      onScroll(offsetY) {
         this.setOffsetY(offsetY)
         if(offsetY > 0) {
            this.hideTitle()
            this.scrollTop = 52
         } else {
            this.showTitle()
            this.scrollTop = 94
         }
         // 刷新滚动区域的高度
         this.$refs.scroll.refresh()
      },
      hideTitle() {
         this.titleVisible = false
      },
      showTitle() {
         this.titleVisible = true
      },
      showHotSearch() {
         this.hotSearchVisible = true,
         this.hideTitle()
      },
      back() {
         if(this.offsetY === 0) {
            this.showTitle()
         }
         if(this.hotSearchVisible) {
            this.hotSearchVisible = false
            this.$refs.hotSearchList.onScroll()
         }
      },
      hotSearchScroll() {
         if(!this.hotSearchVisible) {
            this.$refs.hotSearchList.scrollRefresh()
         }
      }
   },
   mounted () {
      home().then(response => {
         if(response && response.status === 200) {
            const data = response.data
            // 获取数据
            this.banners = data.banner
            this.guessYouLike = data.guessYouLike
            this.recommend = data.recommend
            this.featured = data.featured
            this.categoryList = data.categoryList
         }
      })
   },
   // 页面回到首页保存之前的位置
   activated () {
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()
   },
   deactivated () {
      this.saveY = this.offsetY
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
   .home {
      width: 100%;
      height: 100%;
      background: #fff;
      .home-bar-center {
         font-weight: 700;
      }
      .banner-wrapper {
         width: 100%;
         padding: px2rem(10);
         box-sizing: border-box;
         .banner-img {
            width: 100%;
            height: px2rem(150);
            // 适应屏幕的宽高
            background-repeat: no-repeat;
            background-size: 100% 100%;
         }
      }
      
   }
</style>

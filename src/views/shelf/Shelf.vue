<template>
   <div class="shelf">
      <!-- 标题 -->
      <shelf-title/>
      <scroll class="shelf-scroll"
              :top="0"
              :bottom="49"
              @onScroll="onScroll">
         <!-- 搜索 -->
         <shelf-search/>
         <shelf-list :bookList="shelfList"/>
      </scroll>
      <!-- 底部导航 -->
      <shelf-footer/>
   </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import ShelfSearch from './childComps/ShelfSearch.vue'
import ShelfTitle from './childComps/ShelfTitle.vue'
import ShelfList from './childComps/ShelfList.vue'
import ShelfFooter from './childComps/ShelfFooter.vue'

import {storeShelfMixin} from 'utils/mixin'

export default {
   name:'Shelf',
   components: { 
      ShelfTitle,
      ShelfSearch,
      Scroll,
      ShelfList,
      ShelfFooter 
   },
   mixins: [storeShelfMixin],
   data () {
      return {
         // bookList: null
      }
   },
   methods: {
      onScroll(offsetY) {
         this.setOffsetY(offsetY)
      }
   },
   mounted () {
      this.getShelfList()
      this.setShelfCategory([])
      this.setCurrentType(1)
   }

}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
   .shelf {
      width: 100%;
      height: 100%;
      .shelf-scroll {
         position: absolute;
         top: 0;
         left: 0;
         background: #fff;
      }
   }
</style>

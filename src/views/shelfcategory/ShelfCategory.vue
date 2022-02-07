<template>
   <div class="shelf-category">
      <shelf-category-title/>
      <scroll class="shelf-category-scroll"
              :top="0"
              :bottom="scrollBottom"
              ref="scroll"
              v-if="isShowList">
            <shelf-list :bookList="shelfCategory.itemList" :top="42"/>
      </scroll>
      <!-- 分类列表为空 -->
      <div v-else class="shelf-category-empty">
         {{$t('shelf.groupNone')}}
      </div>
      <shelf-footer/>
   </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import ShelfCategoryTitle from './childComps/ShelfCategoryTitle.vue'
import {storeShelfMixin} from 'utils/mixin'
import ShelfList from '../shelf/childComps/ShelfList.vue'
import ShelfFooter from '../shelf/childComps/ShelfFooter.vue'
export default {
   name:'ShelfCategory',
   components: {
      ShelfCategoryTitle,
      Scroll,
      ShelfList,
      ShelfFooter 
   },
   mixins: [storeShelfMixin],
   data () {
      return {
         // scrollBottom: 0
      }
   },
   computed: {
      isShowList() {
         return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      },
      scrollBottom() {
         return this.isEditMode ? 48 : 0
      }
   },
   // watch: {
   //   isEditMode(isEditMode) {
   //      this.scrollBottom = isEditMode ? 48: 0
   //      this.$nextTick(() => {
   //         this.$refs.scroll.refresh()
   //      })
   //   } 
   // },
   methods: {
      editModeRefresh() {
         if(this.isEditMode) {
            this.$refs.scroll.refresh()
         }
      }
   },
   mounted () {
      this.getCategoryList(this.$route.query.title)
      this.setCurrentType(2)
   }

}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
   .shelf-category {
      .shelf-category-scroll {
         background: #fff;
      }
      .shelf-category-empty {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         font-size: px2rem(14);
         background: #fff;
         z-index: 100;
         @include center;
      }
   }
</style>

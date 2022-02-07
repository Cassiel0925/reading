<template>
   <div class="category">
      <!-- 标题 -->
      <nav-bar class="category-nav-bar" :class="{'hide-shadow': isHideShadow}">
         <div slot="center" class="category-title-text">{{$t('home.category')}}</div>
         <div slot="right" class="category-right-text" @click="showCategoryList">
            {{$t('home.seeAll')}}
         </div>
      </nav-bar>
      <!-- 分类 -->
      <categories-item :categories="categories"></categories-item>
   </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CategoriesItem from './childComps/CategoriesItem.vue'
import {storeShelfMixin} from 'utils/mixin'
import {home} from 'network/index'
export default {
   name:'Category',
   components: {
      NavBar,
      CategoriesItem
   },
   mixins: [storeShelfMixin],
   watch: {
      offsetY(v) {
         if(v > 0) {
            this.isHideShadow = false
         } else {
            this.isHideShadow = true
         }
      }
   },
   data () {
      return {
         categories: null,
         isHideShadow: true
      }
   },
   methods: {
      getCategory() {
         home().then(response => {
            this.categories = response.data.categories
         })
      },
      showCategoryList() {
         this.$router.push('/list')
      }
   },
   mounted () {
      this.getCategory()
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
   .category {
      background: #fff;
      .category-nav-bar {
         box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(100, 100, 100, .2);
         &.hide-shadow {
            box-shadow: none;
         }
         .category-title-text {
            font-weight: 700;
         }
         .category-right-text {
            font-size: px2rem(10);
         }
      }
      
   }
</style>

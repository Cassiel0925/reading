<template>
    <div class="category-list">
        <div class="category-list-wrapper"
             v-for="(item, index) in categoryList"
             :key="index">
            <category-list-item :categoryData="item"/>
        </div>
    </div>
</template>
<script>
import CategoryListItem from './CategoryListItem.vue'
export default {
   name:'Featured',
   components: {
      CategoryListItem,
   },
  props: {
       categoryList: Array
   },
   
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .category-list {
        .category-list-wrapper {
            
        }
    }
</style>

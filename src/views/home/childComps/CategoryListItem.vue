<template>
    <div class="category-list-item-flex">
        <title-bar :leftItem="categoryText(categoryData.category)"
                    :rightItem="$t('home.seeAll')"
                    @itemClick="showBookCategory"/>
            <div class="category-list-item-wrapper">
                <div class="category-list-item" 
                    v-for="(book, i) in categoryData.list" 
                    :key="i"
                    @click="showBookDetail(book)">
                    <div class="category-item-img">
                        <img :src="book.cover" alt="">
                    </div>
                    <div class="category-itme-content">
                        <div class="content-title title-small">{{book.title}}</div>
                        <div class="content-author sub-title-tiny">{{book.author}}</div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import TitleBar from 'components/common/titlebar/TitleBar.vue'
import {categoryText, getCategoryName } from 'utils/store'
import {storeHomeMixin} from 'utils/mixin'

export default {
    name: 'CategoryListItem',
    components: {
        TitleBar
    },
    mixins: [storeHomeMixin],
    props: {
        categoryData: Object
    },
    methods: {
       categoryText(index) {
           return categoryText(index, this)
       },
       showBookCategory() {
           console.log(getCategoryName(this.categoryData.category));
           this.$router.push({
               path: '/list',
               query: {
                   category: getCategoryName(this.categoryData.category),
                   categoryText: this.categoryText(this.categoryData.category)
               }
           })
       }
   }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
    .category-list-item-wrapper {
        display: flex;
        margin-bottom: px2rem(20);
        .category-list-item {
            flex: 0 0 25%;
            width: 25%;
            padding: px2rem(8);
            box-sizing: border-box;
            .category-item-img {
                width: 100%;
                img {
                    width: 100%;
                }
            }
            .category-itme-content {
                margin-top: px2rem(5);
                .content-title {}
                .content-author {
                    margin-top: px2rem(3);
                }
            }
        }
    }
</style>
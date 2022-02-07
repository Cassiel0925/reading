<template>
    <div class="shelf-item" 
         :class="{'shelf-item-shadow': data.type !== 3}"
         @click="itemSelectClick">
        <component :is="item"
                   :data="data"
                   class="shelf-item-comp"
                   :class="{'is-edit': isEditMode && data.type === 2}">
        </component>
        <!-- icon -->
        <div class="shelf-item-icon-wrapper" 
             v-show="data.type === 1 && isEditMode">
            <span class="icon-selected"
                  :class="{'is-selected': data.selected}"></span>
        </div>
        <div class="shelf-item-private-icon-wrapper"
             v-show="data.type === 1 && isPrivate">
            <span class="icon-private"></span>
        </div>
    </div>
</template>
<script>
import ShelfItemBook from './ShelfItemBook.vue'
import ShelfItemCategory from './ShelfItemCategory.vue'
import ShelfItemAdd from './ShelfItemAdd.vue'
import {storeShelfMixin} from 'utils/mixin'
export default {
   name:'ShelfItem',
   props: {
       data: Object
   },
   mixins: [storeShelfMixin],
   data () {
       return {
           book: ShelfItemBook,
           category: ShelfItemCategory,
           add: ShelfItemAdd
       }
   },
   computed: {
       item() {
           if(this.data.type === 1) {
               return this.book
           } else if(this.data.type === 2) {
               return this.category
           } else if(this.data.type === 3) {
               return this.add
           }
       },
       isPrivate() {
           return this.data.private
       }
   },
   methods: {
       // 点击书籍被选中
       itemSelectClick() {
           // 编辑状态下点击 表示被选中
           if(this.isEditMode) {
               this.data.selected = !this.data.selected
               if(this.data.selected && this.data.type === 1) {
                   // 书本被选中
                   this.shelfSelected.pushWithoutDuplicate(this.data)
               } else {
                   this.setShelfSelected(this.shelfSelected.filter(book => book.id !== this.data.id))
               }
           } else {
               if(this.data.type === 1) {
                   return this.showBookDetail(this.data)
               } else if(this.data.type === 2) {
                    this.$router.push({
                        path: '/shelfcategory',
                        query: {
                            title: this.data.title
                        }
                    })
                } else if(this.data.type === 3) {
                    this.$router.push('/home')
                }
           }
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-item {
        position: relative;
        width: 100%;
        height: 100%;
        &.shelf-item-shadow {
            box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
        }
        .shelf-item-comp {
            opacity: 1;
            &.is-edit {
                opacity: 50%;
            }
        }
        .shelf-item-icon-wrapper {
            position: absolute;
            bottom:px2rem(-2);
            right: px2rem(2);
            .icon-selected {
                color: #999;
                font-size: px2rem(16);
                &.is-selected {
                    color: rgb(74, 171, 255);
                }
            }
        }
        .shelf-item-private-icon-wrapper {
            position: absolute;
            bottom: px2rem(-2);
            left: px2rem(2);
            .icon-private {
                color: #000;
                font-size: px2rem(16);
            }
        }
    }
</style>

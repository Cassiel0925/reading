<template>
    <div class="shelf-list" :style="{top: shelfListTop}">
        <transition-group name="list"
                          tag="div"
                          id="shelf-list">
            <div class="shelf-list-item-wrapper"
                v-for="item in bookList"
                :key="item.id">
                <shelf-item :data="item" :style="{height: itemHeight }"/>
                <!-- title -->
                <div class="shelf-list-item-text-wrapper">
                    <span class="item-text title-small">{{item.title}}</span>
                </div>
            </div>
        </transition-group>
        
    </div>
</template>
<script>
import ShelfItem from './ShelfItem.vue'
import {realPx, px2rem} from 'utils/utils'
export default {
   name:'ShelfList',
   components: { 
       ShelfItem 
    },
   props: {
       bookList: Array,
       top: {
           type: Number,
           default: 94
       }
   },
   computed: {
       // shelfItem 的高度
       itemHeight() {
           // w /250 = h / 350
           // h = w / 250 * 350
           // 120 -> padding 部分 
           return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
       },
       shelfListTop() {
           return px2rem(this.top) + 'rem'
       }
   },
   
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-list {
        position: absolute;
        left: 0;
        width: 100%;
        #shelf-list {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            padding: 0 px2rem(15) px2rem(15) px2rem(15);
            box-sizing: border-box;
        }
        .shelf-list-item-wrapper {
            flex: 0 0 33.33%;
            width: 33.33%;
            padding: px2rem(15);
            box-sizing: border-box;
            .shelf-list-item-text-wrapper {
                margin-top: px2rem(10);
                box-sizing: border-box;
            }
        }
    }
</style>

<template>
    <div class="detail-footer">
        <tab-bar class="detail-footer-tab-bar">
            <tab-bar-item class="detail-footer-tab-bar-item">
                <span slot="item-text" @click.stop.prevent="readBook">{{$t('detail.read')}}</span>
            </tab-bar-item>
            <!-- <tab-bar-item class="detail-footer-tab-bar-item">
                <span slot="item-text">{{$t('detail.listen')}}</span>
            </tab-bar-item> -->
            <tab-bar-item class="detail-footer-tab-bar-item">
                <span slot="item-text" @click.stop.prevent="addOrRemoveShelf">{{inBookShelf ? $t('detail.isAddedToShelf') : $t('detail.addOrRemoveShelf')}}</span>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
import {storeShelfMixin} from 'utils/mixin'
import {removeFromBookShelf, addToShelf} from 'utils/store'
import {getBookShelf, saveBookShelf} from 'utils/localStorage'
export default {
   name:'DetailFooter',
   components: { 
       TabBarItem, 
       TabBar, 
    },
    mixins: [storeShelfMixin],
    props: {
        bookItem: Object,
        fileName: String
    },
    computed: {
        // 判断当前书籍是否在书架内
        inBookShelf() {
            if (this.bookItem && this.shelfList) {
                // 定义一个自执行函数，将书架转为一维数组结构，并且只保留type为1的数据（type=1的为电子书）
                const flatShelf = (function flatten(arr) {
                    return [].concat(...arr.map(v => v.itemList ? [v, ...flatten(v.itemList)] : v))
                })(this.shelfList).filter(item => item.type === 1)
                // 查找当前电子书是否存在于书架
                const book = flatShelf.filter(item => item.fileName === this.bookItem.fileName)
                return book && book.length > 0
            } else {
                return false
            }
        },
       
    },
    methods: {
        // 加入书架或移出书架
        addOrRemoveShelf() {
            if(this.inBookShelf) {
                // 移除书架
                this.setShelfList(removeFromBookShelf(this.bookItem))
                .then(() => {
                    saveBookShelf(this.shelfList)
                })
            } else {
                // 加入书架
                addToShelf(this.bookItem)
                this.setShelfList(getBookShelf())
            }
        },
        // 去阅读
        readBook() {
            this.$router.push({
                path: `/ebook/${this.bookItem.categoryText}|${this.fileName}.epub`
            })
        },
    }
   

}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .detail-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 px2rem(-2) px2rem(1) 0 rgba(0, 0, 0, .1);
        .detail-footer-tab-bar {
            .detail-footer-tab-bar-item {
                @include center;
                font-size: px2rem(14);
                color: rgb(74, 171, 255);
                font-weight: 700;
            }
        }
    }
</style>    

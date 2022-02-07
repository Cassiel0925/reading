<template>
    <div class="store-list">
        <detail-bar @back="back" :title="title"></detail-bar>
        <scroll :top="42"
                :bottom="0"
                ref="scroll"
                class="list-scroll">
            <featured :titleText="titleText ? titleText : getCategoryText(key)"
                      :btnText="''"
                      v-for="(value, key, index) in list"
                      :key="index"
                      :featured="value"></featured>
        </scroll>
    </div>
</template>

<script>
import DetailBar from 'components/content/detailbar/DetailBar'
import Scroll from 'components/common/scroll/Scroll.vue'

import Featured from '../home/childComps/Featured.vue'

import {list} from 'network/index'
import { categoryList, categoryText } from 'utils/store'

export default {
    name: 'StoreList',
    components: {
        DetailBar,
        Scroll,
        Featured
    },
    data () {
        return {
            list: null,
            total: null
        }
    },
    computed: {
        // 动态生成标题数据
      title() {
         if(this.list) {
            return this.total && this.$t(`home.allBook`).replace('$1', this.totalNumber)
         } else {
            return null
         }
      },

      // 获取当前列表中电子书总数
      totalNumber() {
         let num = 0
         Object.keys(this.list).forEach(key => {
            num += this.list[key].length
         })
         return num
      }, 
    },
    methods: {
        getList() {
            list().then(response => {
                this.list = response.data.data
                this.total = response.data.total
                const category = this.$route.query.category
                const keyword = this.$route.query.keyword
                if(category) {
                    const key = Object.keys(this.list).filter(item => item === category)[0]
                    const data = this.list[key]
                    this.list = {}
                    this.list[key] = data
                } else if(keyword) {
                    // 如果用户输入了关键字，则通过书名进行关键字匹配（搜索算法）
                    Object.keys(this.list).filter(key => {
                        this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
                        return this.list[key].length > 0
                    })
                }
            })
        },
        //4. 获取分类文本
        getCategoryText(key) {
            return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
        },
        back() {
            this.$router.go(-1)
        }
    },
    mounted () {
        this.getList()
        this.titleText = this.$route.query.categoryText
    }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
    .store-list {
        .list-scroll {
            z-index: 9999;
            background: #fff;
        }
    }
</style>
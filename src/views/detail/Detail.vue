<template>
    <div class="detail">
        <detail-bar @back="back" ref="titleBar"/>
        <scroll :top="42"
                :bottom="49"
                class="detail-scroll"
                ref="scroll"
                @onScroll="onScroll">
            <detail-book-info :cover="cover"
                              :title="title"
                              :author="author"
                              :abstract="des"/>
            <detail-publish :publisher="publisher"
                            :category="category"
                            :lang="lang"
                            :ISBN="ISBN"/>
            <detail-navigation :navigation="navigation"
                               :flatNavigation="flatNavigation"/>
            <!-- 试读 -->
            <div class="try-reading">
                <div class="title">{{$t('detail.trial')}}</div>
                <div class="content-list" v-if="!displayed">
                    <div class="loading-text-wrapper">
                        <div class="loading-text">{{$t('detail.loading')}}</div>
                    </div>
                </div>
                <div id="preview" ref="preview" v-show="displayed"></div>
            </div>
        </scroll>
        <detail-footer :bookItem="bookItem"
                       :fileName="fileName"/>
    </div>
</template>
<script>
import DetailBar from 'components/content/detailbar/DetailBar.vue'
import Epub from 'epubjs'
import {detail} from 'network/index'
import DetailBookInfo from './childComps/DetailBookInfo.vue'
import DetailPublish from './childComps/DetailPublish.vue'
import Scroll from 'components/common/scroll/Scroll'
import DetailNavigation from './childComps/DetailNavigation.vue'
import DetailFooter from './childComps/DetailFooter.vue'
export default {
   name:'Detail',
   components: {
       DetailBar,
      DetailBookInfo,
      DetailPublish,
      Scroll,
      DetailNavigation,
      DetailFooter
   },
  data () {
       return {
           category: null,
           cover: null,
           title: null,
           author: null,
           metadata: null,
           navigation: null,
           displayed: false,
           abstract: null,
           bookItem: null,
           fileName: null
       }
   },
   computed: {
     publisher() {
         return this.metadata ? this.metadata.publisher : '-'
     },
     lang() {
         return this.metadata ? this.metadata.language : '-'
     },   
     ISBN() {
         return this.metadata ? this.metadata.identifier : '-'
     },
     // * 将目录转换为一维数组
     flatNavigation() {
         if(this.navigation) {
             return Array.prototype.concat.apply([], Array.prototype.concat.apply([],  this.doFlatNavigation(this.navigation.toc)))
         } else {
             return []
         }
     },
     // des
     des() {
        //  if(this.abstract) {
        //      return this.abstract.substring(0, 100)
        //  } else {
        //      return ''
        //  }
        if(this.bookItem) {
            return this.bookItem.novel_content.substring(10,150)
        }
     }
   },
   methods: {
       back() {
           this.$router.back()
       },
       // 电子书初始化
       init() {
           this.fileName = this.$route.query.fileName
           this.category = this.$route.query.category
           if(this.fileName) {
               detail({
                   fileName: this.fileName
               }).then(response => {
                   if(response.status === 200 && response.data.error_code === 0 && response.data.data){
                       const data = response.data.data
                       this.bookItem = data
                       this.cover = this.bookItem.cover
                       this.title = this.bookItem.title
                       this.author = this.bookItem.author
                       // 获取 rootFile 数据
                    //    let rootFile = data.rootFile
                    //    if(rootFile.startsWith('/')) {
                    //        rootFile = rootFile.subString(1, rootFile.length)
                    //    }
                       // 根据rootFile 拼接出opf文件路径
                       this.opf = `${process.env.VUE_APP_EPUB_URL}/${this.category}/${this.fileName}.epub`
                       this.parseBook(this.opf)
                   }
               })
           }
       },
       // 解析电子书
       parseBook(url) {
           this.book = new Epub(url)
           // 获取电子书的metadata信息
           this.book.loaded.metadata.then(metadata => {
               this.metadata = metadata
           })

           // 获取电子书目录信息
           this.book.loaded.navigation.then(nav => {
               this.navigation = nav
               // 获取第二章目录内容， 第一章通常是封面
               if(this.navigation.toc && this.navigation.toc.length > 1) {
                   const candisplay = this.display(this.navigation.toc[1].href)
                   if(candisplay) {
                       candisplay.then(section => {
                           if (this.$refs.scroll) {
                               this.$refs.scroll.refresh()
                           }
                           this.displayed = true
                           // * 
                           const reg = new RegExp('<.+?>', 'g')
                           const text = section.output.replace(reg, '').replace(/\s\s/g, '')
                           this.abstract = text
                       })
                   }
               }
           })
       },
        // 根据传入的目录信息，渲染电子书
      display(location) {
          if (this.$refs.preview) {
            if (!this.rendition) {
                this.rendition = this.book.renderTo('preview', {
                    width: window.innerWidth > 640 ? 640 : window.innerWidth,
                    height: window.innerHeight,
                    method: 'default'
                })
            }
            if (!location) {
                return this.rendition.display()
            } else {
                return this.rendition.display(location)
            }
          }
      },
       // 将目录进行分级
       doFlatNavigation(content, deep = 1) {
           const arr = []
           content.forEach(item => {
               item.deep = deep
               arr.push(item)
               if(item.subitems && item.subitems.length > 0) {
                   arr.push(this.doFlatNavigation(item.subitems, deep + 1))
               }
           })
           return arr
       },
       // 页面滚动
       onScroll(offsetY) {
           if(offsetY > 0) {
               this.$refs.titleBar.showShadow()
           } else {
               this.$refs.titleBar.hideShadow()
           }
       },
   },
   mounted () {
       this.init()
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .detail {
        width: 100%;
        height: 100%;
        .detail-scroll {
            width: 100%;
            height: 100%;
            z-index: 100;
            background: #fff;
            .try-reading {
                width: 100%;
                // padding: px2rem(20) 0 px2rem(15) px2rem(15);
                box-sizing: border-box;
                .title {
                    font-size: px2rem(20);
                    color: #333;
                    padding: px2rem(20) 0 0 px2rem(15);
                }
                .content-list {
                    .loading-text-wrapper {
                        font-size: px2rem(16);
                        color: #333;
                        padding-top: px2rem(15);
                        padding-left: px2rem(15);
                        box-sizing: border-box;
                    }
                }
            }
        }
    }
</style>

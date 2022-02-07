<template>
    <div class="ebook" ref="ebook">
        <ebook-reader/>
        <ebook-title/>
        <ebook-footer/>
        <ebook-bookmark/>
    </div>
</template>
<script>
import EbookFooter from './childComps/ebookfooter/EbookFooter.vue'
import EbookReader from './childComps/EbookReader.vue'
import EbookTitle from './childComps/ebooktitle/EbookTitle.vue'
import EbookBookmark from './childComps/ebookmark/EbookBookmark.vue'
import {storeEbookMixin} from 'utils/mixin'
import { getReadTime, saveReadTime } from 'utils/localStorage' 

export default {
   name:'Ebook',
   components: { 
       EbookReader,
      EbookFooter,
      EbookTitle,
      EbookBookmark 
    },
    mixins: [storeEbookMixin],
    watch: {
      offsetY(v) {
          if(!this.isTitleAndFooterVisible && this.bookAvailable){
                if(v > 0) {
                    this.move(v)
                } else if (v ===0) {
                    this.restore()
                }
          }
          
      }  
    },
    mounted () {
        this.setEbookPage(true)
        this.startLoopReadTime()
    },
    methods: {
         // 还原
        restore() {
            this.$refs.ebook.style.top = 0
            this.$refs.ebook.style.transition = 'all .2s linear'
            setTimeout(() => {
                this.$refs.ebook.style.transition = ''
            }, 200)
        },
        move(v) {
            this.$refs.ebook.style.top = v + 'px'
        },
        startLoopReadTime() {
            let readTime = getReadTime(this.fileName)
            if(!readTime) {
                readTime = 0
            }
            this.task = setInterval(() => {
                readTime++
                if(readTime % 30 === 0) {
                    saveReadTime(this.fileName, readTime)
                }
            }, 1000)
        }
    },
    beforeDestroy() {
        if (this.task) {
            clearInterval(this.task)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .ebook{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

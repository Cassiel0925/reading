<template>
    <div class="setting-progress">
        <div class="read-time-wrapper">
            <span class="read-time-text">{{getReadTimeText()}}</span>
            <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
            <!-- 上一章 -->
            <div class="progress-icon-wrapper" @click="prevSection()">
                <span class="icon-back"></span>
            </div>
            <!-- 进度条 -->
            <input  class="progress"
                    type="range"
                    max="100"
                    min="0"
                    step="1"
                    :value="progress"
                    :disabled="!bookAvailable"
                    @change="onProgressChange($event.target.value)"
                    @input="onProgressInput($event.target.value)"
                    :style="{'background-size': `${progress}% 100% !important`}">
            <!-- 下一章 -->
            <div class="progress-icon-wrapper" @click="nextSection()">
                <span class="icon-forward"></span>
            </div>
        </div>
        <!-- <div class="text-wrapper">
            <span class="progress-section-text">{{getSectionName}}</span>
            <span>({{bookAvailable ? progress + '%' : '加载中…'}})</span>
        </div> -->
    </div>
</template>
<script>
import {storeEbookMixin} from 'utils/mixin'
export default {
   name:'SettingProgress',
   mixins: [storeEbookMixin],
   computed: {
       // 获取章节名称
        // getSectionName() {
        //     return (this.section > 0 && this.navigation[this.section].label) ? this.navigation[this.section].label : ''
        // }
   },
   watch: {
       
   },
   methods: {
       //和enter事件相似
       onProgressChange(progress) {
           this.setProgress(progress).then(() => {
               this.displayProgress()
           })
       },
        //实时监控，每次变化都会调用
       onProgressInput(progress) {
           this.setProgress(progress).then(() => {
               this.displayProgress()
           })
       },
       // 进度
       displayProgress() {
           const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
           this.display(cfi)
       },
       //    上一章
       prevSection() {
           if(this.section > 0 && this.bookAvailable) {
               this.setSection(this.section - 1).then(() => {
                   this.displaySection()
               })
           }
       },
        // 下一章
       nextSection() {
           if(this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
               this.setSection(this.section + 1).then(() => {
                   this.displaySection()
               })
           }
       },
        //  章节显示
        displaySection() {
            const sectionInfo = this.currentBook.section(this.section)
            if (sectionInfo && sectionInfo.href) {
                this.display(sectionInfo.href)
            }
        },
        
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
        .read-time-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(14);
            @include center;
        }
        .progress-wrapper {
            width: 100%;
            height: px2rem(100);
            @include center;
            padding: 0 px2rem(15);
            margin-top: px2rem(12);
            box-sizing: border-box;
            .progress-icon-wrapper {
                font-size: px2rem(20);
            }
            .progress {
                width: 100%;
                -webkit-appearance: none;
                height: px2rem(2);
                margin: 0 px2rem(10);
                &.focus {
                    outline: none;
                }
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: #fff;
                    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                    border: px2rem(1) solid #ddd;
                }
            }
        }
        // .text-wrapper {
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     width: 100%;
        //     color: #333;
        //     @include center;
        //     font-size: px2rem(14);
        //     padding: 0 px2rem(15);
        //     box-sizing: border-box;
        //     .progress-section-text {
        //         @include ellipsis;
        //     }
        // }
    }
</style>

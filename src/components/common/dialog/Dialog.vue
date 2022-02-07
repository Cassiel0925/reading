<template>
    <transition name="fade">
        <div class="dialog" v-show="dialogVisible">
            <div class="dialog-wrapper">
                <!-- title -->
                <div class="dialog-title-wrapper">
                    <span class="dialog-title-text">{{title}}</span>
                </div>
                <!-- slot -->
                <slot></slot>
                <!-- btn -->
                <slot name="btn"></slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
   name:'Dialog',
   props: {
       title: String
   },
   data () {
       return {
           dialogVisible: false
       }
   },
   methods: {
       show() {
           this.dialogVisible = true
       },
       hide() {
           this.dialogVisible = false
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0, .3);
        z-index: 10000;
        @include center;
        .dialog-wrapper {
            display: flex;
            flex-flow: column;
            background: #fff;
            border-radius: px2rem(10);
            width: 60%;
            max-height: 80%;
            .dialog-title-wrapper {
                font-size: px2rem(20);
                font-weight: 700;
                text-align: center;
                padding: px2rem(30) 0 px2rem(20) 0;
                .dialog-title-text {}
            }
            
        }
    }
</style>

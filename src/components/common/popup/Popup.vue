<template>
    <div class="popup" v-show="popupVisible">
        <!-- bg -->
        <transition name="fade">
            <div class="popup-bg"></div>
        </transition>
        <!-- content -->
        <transition name="popup-slide-up">
            <div class="popup-wrapper" v-show="visible">
                <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
                <div class="popup-btn"
                     :class="{'danger': item.type === 'danger'}"
                     v-for="(item, index) in btn"
                     :key="index"
                     @click="item.click">
                    {{item.text}}
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
   name:'Popup',
   props: {
       title: String,
       btn: Array
   },
   data () {
       return {
           popupVisible: false,
           visible: false
       }
   },
   methods: {
       show() {
           this.popupVisible = true
           setTimeout(() => {
               this.visible = true
           })
       },
       hide() {
           this.visible = false
           setTimeout(() => {
                this.popupVisible = false
           }, 200)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        .popup-bg {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .3);
        }
        .popup-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #fff;
            .popup-title {
                font-size: px2rem(12);
                color: #999;
                border-bottom: px2rem(1) solid #eee;
                padding: px2rem(15) 0;
                box-sizing: border-box;
                text-align: center;
            }
            .popup-btn {
                font-size: px2rem(16);
                color: #333;
                font-weight: 700;
                text-align: center;
                padding: px2rem(20) 0;
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #eee;
                &.danger {
                    color: rgb(255, 102, 159);
                }
            }
        }
    }
</style>

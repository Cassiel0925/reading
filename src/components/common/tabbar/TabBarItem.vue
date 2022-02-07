<template>
    <div class="tab-bar-item" @click="tabClick">
        <!-- 图标 -->
        <div class="tab-bar-item-icon" v-if="!isActive"><slot name="item-icon"></slot></div>
        <div class="tab-bar-item-icon" v-else><slot name="item-icon-active"></slot></div>
        <!-- 文本 -->
        <div class="tab-bar-item-text" :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template> 
<script>
export default {
   name:'TabBarItem',
   props: {
       path: String,
       activeColor: {
           type: String,
           default: 'rgb(74, 171, 255)'
       },

   },
   computed: {
       isActive() {
           return this.$route.path.includes(this.path)
       },
       activeStyle() {
           return this.isActive ? {color: this.activeColor} : {}
       }
   },
   methods: {
       tabClick() {
           if(this.path) {
               this.$router.replace(this.path).catch(() => {})
           }
           this.$emit('tabClick')
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .tab-bar-item {
        flex: 1;
        height: px2rem(49);
        text-align: center;
        font-weight: 400;
        // @include columnCenter;
        .tab-bar-item-icon {
            // width: px2rem(24);
            // height: px2rem(24);
            font-size: px2rem(20);
            padding-top: px2rem(3);
            padding-bottom: px2rem(5);
            box-sizing: border-box;
        }
        .tab-bar-item-text {
            font-size: px2rem(14);
            color: #999;
        }
    }
</style>

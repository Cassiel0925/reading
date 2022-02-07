<template>
    <div class="title-bar">
        <div class="title-bar-left">{{leftItem}}</div>
        <div class="title-bar-right" @click="itemClick">{{rightItem}}</div>
        <slot></slot>
    </div>
</template>
<script>
export default {
   name:'TitleBar',
   props: {
       leftItem: String,
       rightItem: String
   },
   methods: {
       itemClick() {
           this.$emit('itemClick')
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .title-bar {
        width: 100%;
        padding: px2rem(15) px2rem(10);
        box-sizing: border-box;
        @include top;
        .title-bar-left {
            flex: 1;
            font-size: px2rem(18);
            font-weight: 700;
            color: #333;
        }
        .title-bar-right {
            font-size: px2rem(14);
            color: rgb(74, 171, 255);
        }
    }
</style>

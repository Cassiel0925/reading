<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
   name:'NavBar',
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .nav-bar {
        display: flex;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(42);
        background: #fff;
        color: #333;
        text-align: center;
        line-height: px2rem(42);
        .left,
        .right {
            flex: 0 0 px2rem(70);
            font-size: px2rem(18);
        }
        .center {
            flex: 1;
            font-size: px2rem(18);
        }
        
    }
</style>

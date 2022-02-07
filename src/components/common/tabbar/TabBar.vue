<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
   name:'TabBar',
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .tab-bar {
        display: flex;
        background-color: #fff;
        padding-top: px2rem(3);
        box-sizing: border-box;
        z-index: 1000;
    }
</style>

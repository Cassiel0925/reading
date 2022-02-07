<template>
    <div class="detail-bar" :class="{'hide-shadow': isHideShadow}">
        <div class="detail-bar-left" @click="back">
            <div class="icon-back"></div>
        </div>
        <div class="detail-bar-center">
            <div class="title-text">{{title}}</div>
        </div>
        <div class="detail-bar-right" @click="toShelf">
            <div class="icon-shelf"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailBar',
    props: {
        title: String
    },
    data () {
        return {
            isHideShadow: true
        }
    },
    methods: {
        back() {
            this.$emit('back')
        },
        showShadow() {
            this.isHideShadow = false
        },
        hideShadow() {
            this.isHideShadow = true
        },
        toShelf() {
            this.$router.push('/shelf')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
    .detail-bar {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(42);
        background: #fff;
        display: flex;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
        &.hide-shadow {
            box-shadow: none;
        }
        .detail-bar-left {
            flex: 0 0 px2rem(40);
            font-size: px2rem(16);
            @include left;
        }
        .detail-bar-center {
            flex: 1;
            font-size: px2rem(16);
            @include center;
        }
        .detail-bar-right {
            flex: 0 0 px2rem(40);
            font-size: px2rem(16);
            @include right;
        }
    }
</style>
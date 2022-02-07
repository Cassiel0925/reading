<template>
    <div class="hot-search">
        <!-- title -->
        <div class="hot-search-title-wrapper">
            <span class="label">{{label}}</span>
            <span class="btn">{{btn}}</span>
        </div>
        <!-- content -->
        <div class="hot-search-list">
            <div class="hot-search-item"
                 v-for="(item, index) in hotSearchList"
                 :key="index">
                <!-- icon -->
                <div class="icon-wrapper">
                    <span class="icon-book icon" v-if="item.type === 1"></span>
                    <span class="icon-search icon" v-if="item.type === 2"></span>
                </div>
                <!-- text -->
                <div class="hot-search-text-wrapper">
                    <div class="text">{{item.text}}</div>
                    <div class="num" v-if="item.num">{{item.num}}人搜索</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotSearch',
    props: {
        label: String,
        btn: String,
        hotSearchList: Array
    }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
    .hot-search {
        .hot-search-title-wrapper {
            display: flex;
            padding: px2rem(15) px2rem(10);
            box-sizing: border-box;
            .label {
                flex: 1;
                text-align: left;
                font-size: px2rem(12);
            }
            .btn {
                flex: 1;
                text-align: right;
                font-size: px2rem(10);
                color: rgb(74, 171, 255);
            }

        }
        .hot-search-list {
            width: 100%;
            margin-left: px2rem(20);
            box-sizing: border-box;
            .hot-search-item {
                display: flex;
                padding: px2rem(10) 0;
                box-sizing: border-box;
                .icon-wrapper {
                     flex: 0 0 px2rem(40);
                     @include center;
                }
                .hot-search-text-wrapper {
                    flex: 1;
                    height: px2rem(35);
                    @include columnLeft;
                    .text {
                        font-size: px2rem(14);
                        font-weight: 700;
                    }
                    .num {
                        padding-top: px2rem(5);
                        font-size: px2rem(12);
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="detail-book-info">
        <div class="detail-book-info-wrapper">
            <!-- img -->
            <div class="book-info-img-wrapper">
                <img :src="cover">
            </div>
            <!-- content -->
            <div class="book-info-content-wrapper">
                <div class="content-title">{{title}}</div>
                <div class="content-author">{{author}}</div>
                <div class="content-abstract">{{abstract}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   name:'DetailBookInfo',
   props: {
       cover: String,
       title: String,
       author: String,
       abstract: String
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .detail-book-info {
        width: 100%;
        .detail-book-info-wrapper {
            display: flex;
            width: 100%;
            padding: px2rem(15) px2rem(10) px2rem(10) px2rem(15);
            box-sizing: border-box;
            border-bottom: px2rem(1) solid #eee;
            .book-info-img-wrapper {
                flex: 0 0 30%;
                width: 30%;
                padding-right: px2rem(10);
                box-sizing: border-box;
                img {
                    width: 100%;
                }
            }
            .book-info-content-wrapper {
                flex: 1;
                width: 70%;
                padding-left: px2rem(15);
                box-sizing: border-box;
                .content-title {
                    font-size: px2rem(24);
                    line-height: px2rem(26);
                    font-weight: 700;
                    color: #333;
                }
                .content-author {
                    font-size: px2rem(14);
                    line-height: px2rem(16);
                    color: rgb(74, 171, 255);
                    margin-top: px2rem(8);
                    box-sizing: border-box;
                }
                .content-abstract {
                    display: block;
                    width: 100%;
                    font-size: px2rem(14);
                    line-height: px2rem(16);
                    color: #999;
                    margin-top: px2rem(8);
                    @include ellipsis2(5)
                }
            }
        }
    }
</style>

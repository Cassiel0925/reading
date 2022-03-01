<template>
   <div class="detail-publish">
      <div class="detail-publish-title">{{$t('detail.copyright')}}</div>
      <div class="content-wrapper">
         <div class="content-row">
            <div class="content-label">{{$t('detail.publisher')}}</div>
            <div class="content-text">{{publisher}}</div>
         </div>
         <div class="content-row">
            <div class="content-label">{{$t('detail.category')}}</div>
            <div class="content-text">{{category}}</div>
         </div>
         <div class="content-row">
            <div class="content-label">{{$t('detail.lang')}}</div>
            <div class="content-text">{{lang}}</div>
         </div>
         <div class="content-row">
            <div class="content-label">{{$t('detail.ISBN')}}</div>
            <div class="content-text">{{ISBN}}</div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   name:'DetailPublish',
   props: {
      publisher: String,
      category: String,
      lang: String,
      ISBN: String
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
   .detail-publish {
      width: 100%;
      border-bottom: px2rem(1) solid #eee;
      padding: px2rem(20) 0 px2rem(10) px2rem(15);
      box-sizing: border-box;
      .detail-publish-title {
         font-size: px2rem(20);
         line-height: px2rem(24);
         font-weight: 700;
         margin-bottom: px2rem(15);
      }
      .content-wrapper {
         .content-row {
            display: flex;
            margin-bottom: px2rem(10);
            box-sizing: border-box;
            .content-label {
               flex: 0 0 px2rem(70);
               font-size: px2rem(14);
               color: #666;
            }
            .content-text {
               flex: 1;
               font-size: px2rem(14);
               color: #333;
               @include ellipsis;
            }
         }
      }
   }
</style>

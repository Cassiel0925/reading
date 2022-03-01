<template>
<div>
      <swiper>
      <swiper-item v-for="item in banners" :key="item.id" class="swiper-item">
          <img :src="item" class="swiper-img">
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
   name:'HomeSwiper',
   components: {
        Swiper, 
      SwiperItem
    },
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .swiper-item {
        width: 100%;
        height: px2rem(180);
        .swiper-img {
            width: 100%;
            height: 100%;
        }
    }
</style>

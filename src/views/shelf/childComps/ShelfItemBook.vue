<template>
    <div class="shelf-item-book">
        <img :src="data.cover" class="shelf-book-img">
    </div>
</template>
<script>
export default {
   name:'ShelfItemBook',
   props: {
       data: Object
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-item-book {
        width: 100%;
        height: 100%;
        .shelf-book-img {
            width: 100%;
            height: 100%;
        }
    }
</style>

<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view/>
     </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
  
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})

</script>

<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
</style>

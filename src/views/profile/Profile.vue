<template>
    <div class="login">
      <!-- 标题 -->
      <nav-bar>
         <div slot="right" class="login-right-icon" @click="toSetting">
            <span class="icon-settings"></span>
         </div>
      </nav-bar>
      <login-user/>
      <login-individual-centres/>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import LoginUser from './childComps/LoginUser.vue'
import LoginIndividualCentres from './childComps/LoginIndividualCentres.vue'
import {storeLoginMixin} from 'utils/mixin'

export default {
   name:'Login',
   components: {
       NavBar,
      LoginUser,
      LoginIndividualCentres
   },
   mixins: [storeLoginMixin],
   methods: {
       toSetting() {
           this.$router.push({
               path: '/setting'
           })
           this.setLoginPage(true)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .login {
        width: 100%;
        height: 100%;
        background: #fff;
    }
</style>

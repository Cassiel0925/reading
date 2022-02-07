<template>
    <div class="login">
      <!-- 标题 -->
      <nav-bar>
         <div slot="center" class="login-name-text">{{$t('login.userName')}}</div>
         <div slot="right" class="login-right-icon">
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

export default {
   name:'Login',
   components: {
       NavBar,
      LoginUser,
      LoginIndividualCentres
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

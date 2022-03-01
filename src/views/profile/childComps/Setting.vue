<template>
    <div class="setting">
        <nav-bar class="setting-nav-bar">
            <div slot="left" class="bar-left" @click="back">
                <span class="icon-back"></span>
            </div>
            <div slot="center" class="bar-center">
                <span>设置</span>
            </div>
        </nav-bar>
        <div class="setting-other-wrapper">
            <div class="setting-other-list"
                 v-for="(item, index) in bar_text"
                 :key="index">
                 <div class="setting-other">
                    <div class="list-text">{{item}}</div>
                    <div class="icon-forward"></div>
                </div>
            </div>
        </div>
        <div class="setting-logout-wrapper" v-show="token" @click="logout">
            <div class="logout-button">退出登录</div>
        </div>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {storeLoginMixin} from 'utils/mixin'
export default {
  components: { NavBar },
   name:'Setting',
   data () {
       return {
           bar_text: ['阅读历史','联系我们','关于reading']
       }
   },
   mixins: [storeLoginMixin],
   methods: {
       back() {
           this.$router.go(-1)
           this.setLoginPage(false)
       },
       logout() {
           this.setAvatar('')
           this.setUsername('')
           this.setLoginPage(false)
           this.setLoginSuccess(false)
           this.setToken('')
           this.$router.push({
               path: '/profile'
           })
       }
   }
  
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .setting {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .setting-nav-bar {
            .bar-left {
                color: #666;
                font-size: px2rem(20);
                padding-right: px2rem(18);
            }
            .bar-center {
                font-size: px2rem(14);
                color: #000;
                font-weight: 700;
            }
        }
        .setting-other-wrapper {
            padding: px2rem(15) 0 0 px2rem(15);
            font-size: px2rem(16);
            color: #666;
            .setting-other {
                display: flex;
                padding: px2rem(8);
                .icon-forward {
                    position: absolute;
                    right: px2rem(20);
                }
            }
        }
        .setting-logout-wrapper {
            padding: px2rem(20) 0;
            @include center;
            .logout-button {
                width: 50%;
                height: px2rem(38);
                background-color: rgb(74,171,255);
                color: #fff;
                border-radius: px2rem(19);
                font-size: px2rem(16);
                @include center;
            }
        }
    }
</style>

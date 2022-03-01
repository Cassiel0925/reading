<template>
    <div class="login">
        <nav-bar class="login-nav-bar">
            <div slot="left" class="icon-back" @click="back"></div>
        </nav-bar>
        <div class="login-title-wrapper">
            <div class="login-title-text">登录</div>
        </div>
        <div class="login-input-wrapper">
            <input type="tel"
                   placeholder="请输入手机号码"
                   class="input"
                   maxlength="11"
                   v-model="phone">
            <input type="password"
                   placeholder="请输入密码"
                   class="input"
                   maxlength="16"
                   v-model="password">
        </div>
        <div class="login-button-wrapper" >
            <div class="login-btn-text" @click="tologin">立即登录</div>
        </div>
        <div class="login-other-methods-wrapper">
            <a class="username-login" href="javascript:;">用户名密码登录</a>
            <span>/</span>
            <a class="code-login" href="javascript:;">短信验证码登录</a>
        </div>
        <div class="login-other-info-wrapper">
            <span class="to-enroll" @click="toEnroll">立即注册</span>
            <span class="foget-password">忘记密码</span>
        </div>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {storeLoginMixin} from 'utils/mixin'
import {login} from 'network/index'

export default {
   name:'Login',
   components: {
       NavBar
   },
   mixins: [storeLoginMixin],
   data () {
       return {
           phone: '',
           password: '',
       }
   },
   methods: {
       back() {
           this.$router.push({
               path: '/profile'
           })
            this.setLoginPage(false)
       },
       toEnroll() {
           this.$router.push({
               path: '/enroll'
           })
       },
       tologin() {
           if(this.phone === '' || this.password === '') {
               this.simpleToast('请输入手机号或密码再登录！')
           } else if(!/^1[345678]\d{9}$/.test(this.phone)) {
               this.simpleToast('手机号出错！')
               return false
           } else if(this.password.length < 6) {
               this.simpleToast('密码输入错误！')
               return false
           }
           login({
               phone: this.phone,
               password: this.password
           }).then(response => {
               console.log(response);
                if(response.status === 200 && response.data.error_code === 0 && response.data.data){
                    const data = response.data.data[0]
                    console.log(data);
                    this.setAvatar(data.avatar)
                    this.setUsername(data.username)
                    this.setLoginSuccess(true)
                    const token = response.data.token
                    this.setToken(token)
                    console.log(token);
                    this.$router.push({
                        path: '/profile'
                    })
                    this.setLoginPage(false)
                } else if(response.status === 200 && response.data.error_code === 1 ) {
                    this.simpleToast('账号或密码输入错误！')
                    return false
                }
           })
       }
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .login {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .login-nav-bar {
            .icon-back {
                text-align: left;
                padding-left: px2rem(12);
            }
        }
        .login-title-wrapper {
            font-size: px2rem(20);
            padding: px2rem(26) 0 px2rem(15) 0;
            @include center;
            .login-title-text {}
        }
        .login-input-wrapper {
            align-items: center;
            padding-left: 12%;
            .input {
                display: block;
                width: 88%;
                height: px2rem(40);
                padding: px2rem(10) px2rem(5);
                box-sizing: border-box;
                font-size: px2rem(14);
                color: #666;

                border: none;
                outline: none;

                border-bottom: px2rem(2) solid #eee;
                &::-webkit-input-placeholder {
                    color: #ccc;
                }
            }
        }
        .login-button-wrapper {
            width: 100%;
            padding-top: px2rem(40);
            @include center;
            .login-btn-text {
                width: 70%;
                height: px2rem(38);
                background-color: rgb(74,171,255);
                color: #fff;
                display: flex;
                font-size: px2rem(14);
                border-radius: px2rem(19);
                box-shadow: px2rem(0) px2rem(2) px2rem(2) px2rem(2) rgba(100, 100, 100, .1);
                @include center;
            }
        }
        .login-other-methods-wrapper {
            font-size: px2rem(12);
            color: #666;
            padding-top: px2rem(15);
            padding-left: px2rem(50);
            .username-login,
            .code-login {
                color: #666;
                text-decoration: none;
            }
        }
        .login-other-info-wrapper {
            font-size: px2rem(14);   
            padding-top: px2rem(38);
            @include center;
            .to-enroll {
                border-right: px2rem(2) solid #666;
            } 
            .to-enroll,
            .foget-password {
                padding: 0 px2rem(10);
            }
        }
    }
</style>
